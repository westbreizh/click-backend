const http = require('http');
const express = require('express');
const stripe = require('stripe')('sk_test_...');
const app = express();
// fichier pour se connecter à notre base de donnée
const db = require("./BDD/database-connect")


const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



//La fonction normalizePort renvoie un port valide (numéro ou chaîne)
//Cela configure le port de connection en fonction de l'environnement
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

app.get('/cool', (req, res) => res.send(cool()))

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


//fonction "createserver" permettant de créer un serveur 
//(prend "app" en argument, notre application crée via le module le framework express)
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {        // L'écouteur d'évènements enregistre le port nommé                            
  const address = server.address();   //sur lequel le serveur s'exécute dans la console
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind, '  🍾🍾');
});

server.listen(port);

















const sendEmail = require('./email/sendEmail');





// fonction d'enregistrement de la facture
function saveInvoiceToDatabase(paymentIntent) {
  console.log(paymentIntent)

  const customerEmail = 'herbreteauaurelien@tutanota.com';
  console.log(customerEmail)
  const amount = paymentIntent.amount / 100; // Stripe utilise des montants en cents, vous pouvez ajuster cela selon votre configuration
  const status = 'paid'; // Définissez le statut approprié pour une facture payée
  const createdDate = new Date(paymentIntent.created * 1000); // Convertissez la date UNIX en date JavaScript
  const paymentDueDate = null; // Remplacez cette valeur par la date d'échéance de paiement appropriée

  // Construisez la requête SQL pour insérer les données dans la table
  const query = `INSERT INTO invoices (customer_email, amount, status, created_at, payment_due_date) VALUES (?, ?, ?, ?, ?)`;

  // Exécutez la requête SQL en utilisant le module mysql2
  db.query(query, [customerEmail, amount, status, createdDate, paymentDueDate], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'enregistrement de la facture :', error);
    } else {
      console.log('Facture enregistrée avec succès');
    }
  });
}




const endpointSecret = "whsec_ab35813a4509298cdec61cee5c63ecf776ed8ec0f201facb38a9f12a067e694b";

// Endpoint de webhook pour recevoir les événements de Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];
  console.log("je rentre dans webhook");

  let event;

  try {
    // Construction de l'événement à partir de la demande et de la signature en utilisant l'endpoint secret
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    // En cas d'erreur lors de la construction de l'événement, renvoyer une réponse d'erreur 400
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Traitement de l'événement en fonction de son type
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log(`intention de paiement réalisé : ${event.type}`);
      saveInvoiceToDatabase(event.data.object);
      sendEmail(event.data.object.customer_email, 'Confirmation de paiement', {
        customerName: event.data.object.customer_name,
        amount: event.data.object.amount / 100, // Conversion du montant en euros
        paymentDate: new Date(event.data.object.created * 1000).toLocaleDateString('fr-FR'), // Formatage de la date
        paymentMethod: event.data.object.payment_method_types[0], // Utilisation de la première méthode de paiement
      }, 'path/to/confirmation_template.html'); // Mettez à jour le chemin vers votre template de confirmation de paiement

      break;
      break;
    case 'charge.succeeded':
      console.log(`charge, paiement réalisé avec succes : ${event.type}`);

      // Traiter l'événement de charge réussie
      break;
    case 'payment_intent.created':
      // Traiter l'événement de création d'un nouvel intent de paiement
      console.log(`intention de paiement crée : ${event.type}`);
      break;
    // Ajouter d'autres cas pour les types d'événements supplémentaires que vous souhaitez traiter
    default:
      console.log(`Type d'événement non géré : ${event.type}`);
  }

  // Renvoyer une réponse 200 pour accuser réception de l'événement
  response.send();
});






