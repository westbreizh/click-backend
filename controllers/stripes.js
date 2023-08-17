const stripe = require('stripe')('sk_test_51NGdYqI8HrVwrRfPKAmQ17TgZh2yWZtGjNNqhHyMXhebWNh03YR5zgGhibzt5oHJM1eRD5UrwRAvhZPNhs48fC9L00UjaCIuJq');
const YOUR_DOMAIN = 'https://click-and-raquette.com';

//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")


// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")



// fonction qui calcule le prix d'un element de articleList
function calculPriceFromArticleListForOneElement(articleList) {
  //voire a transmettre au backend lors de la commande l'id du produit 
 }




   
// fonction de sauvegarde de la commande dans la base de données
function saveOrderToDatabase(articleList, orderDate, statusOrder, totalPrice, userInfo, hub, hubBack) {
  return new Promise((resolve, reject) => {
    // Construisez la requête SQL pour insérer les données dans la table
    const query = 'INSERT INTO orders (articleList, orderDate, statusOrder, totalPrice, userInfo, hub, hubBack) VALUES ( ?, ?, ?, ?, ?, ?, ?)';

    // Exécutez la requête SQL en utilisant le module mysql2
    db.query(query, [articleList, orderDate, statusOrder, totalPrice, userInfo, hub, hubBack], (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'enregistrement de la commande :', error);
        reject(error);
      } else {
        console.log('Commande enregistrée avec succès');
        resolve(results);
      }
    });
  });
}
  

// Fonction de création d'une session Stripe et enregistrement des données dans la table `orders` et la table player
exports.createCheckOutSession = async (req, res) => {
  console.log("Je rentre dans le backend de Stripe");
  
  try {

    // On récupère les données du frontend depuis le corps de la requête
    const datas = JSON.parse(req.body.datas);
    console.log("dtas", datas)
    // données pour l'enregirement de la commande
    const articleList = JSON.stringify(datas.articleList); // Convertir l'objet en chaîne JSON

    const orderDate = new Date();
    const serviceBackDate = new Date();
    const statusOrder ="inité"
    const userInfo = JSON.stringify(datas.userInfo);
    const hub = JSON.stringify(datas.hubChoice);
    const hubBack = JSON.stringify(datas.hubBackChoice);
    const totalPriceString = datas.totalPriceProducts;
    const totalPrice = Number(totalPriceString.replace(",", "."));

    const unitAmount = Math.round(totalPrice * 100);
    console.log("unitAmount " + unitAmount)
    const token = datas.token;
    console.log("token : " + token)

  

    // données pour stripe et enregistrement de la facture, recherche table player, et envoie email, traitement pour le webhook
    const email = datas.userInfo.email;

    // On enregistre les données dans la table `player`
    savePreferencePlayerToDatabase( hub, hubBack, stringId, stringRope, racquetPlayer, email ) 

    // On enregistre les données dans la table `orders`
    const savedOrder = await saveOrderToDatabase(articleList, orderDate, statusOrder, totalPrice, userInfo, hub, hubBack);
    // Récupérer l'ID généré à partir de `insertId`
    const idOrder = savedOrder.insertId; 

    // On crée une session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'], // Ajoutez 'paypal' pour activer PayPal

      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: unitAmount,
            product_data: {
              name: 'Votre commande sur click and raquette',
            },
          },
          quantity: 1,
        },
      ],

      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/paiement-accepte`,
      cancel_url: `${YOUR_DOMAIN}/paiement-refuse`,
      automatic_tax: { enabled: false },

      payment_intent_data: {
        metadata: {
          email: email,
          order_id: idOrder,
          auth_token: token
        },
      },

    });

    console.log("Je suis dans Stripe avant redirection");
    res.redirect(303, session.url);

  } catch (error) {
    console.error('Une erreur est survenue lors de la création de la session de paiement', error);
    res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
  }
};


// fonction d'enregistrement de la facture
function saveInvoiceToDatabase(paymentIntent) {

  const metadata = paymentIntent.metadata;
  const customerEmail = metadata.email;
  const order_id = metadata.order_id;
  const customer_name = paymentIntent.billing_details.name;
  const amount = paymentIntent.amount / 100; // Stripe utilise des montants en cents, vous pouvez ajuster cela selon votre configuration
  const status = 'paid'; // Définissez le statut approprié pour une facture payée
  const createdDate = new Date(paymentIntent.created * 1000); // Convertissez la date UNIX en date JavaScript
  const paymentDueDate = null; // Remplacez cette valeur par la date d'échéance de paiement appropriée

  // Construisez la requête SQL pour insérer les données dans la table
  const query = `INSERT INTO invoices (order_id, customer_name, customer_email, amount, status, created_at, payment_due_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // Exécutez la requête SQL en utilisant le module mysql2
  db.query(query, [order_id, customer_name, customerEmail, amount, status, createdDate, paymentDueDate], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'enregistrement de la facture :', error);
    } else {
      console.log('Facture enregistrée avec succès');
    }
  });
}


// Endpoint de webhook pour recevoir les événements de Stripe et enclencher les actions appropriées
webhookSecret = "whsec_Ke9pttMulkrvQP9cs81ARzNP3rw3eLqV";
exports.actionAfterPaiement = async (req, res) => {

  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event
  console.log('✅ Success:', event.id);

  // Traitement de l'événement en fonction de son type
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log(`intention de paiement réalisé : ${event.type}`);
      break;

    case 'charge.succeeded':
      console.log(`charge, paiement réalisé avec succes : ${event.type}`);

      saveInvoiceToDatabase(event.data.object);

      const paymentMethod = await stripe.paymentMethods.retrieve(event.data.object.payment_method);
      const fullName = event.data.object.billing_details.name;
      const firstName = fullName.split(' ')[0];

      try {
        await sendEmail(event.data.object.billing_details.email, 'Confirmation de paiement', {
          customerName: firstName,
          amount: (event.data.object.amount / 100).toFixed(2),
          paymentDate: new Date(event.data.object.created * 1000).toLocaleDateString('fr-FR'),
          paymentMethod: paymentMethod.card.brand,
        }, 'email/template/confirmationPaiementEmail.handlebars');
      } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        // Vous pouvez choisir comment gérer l'erreur, par exemple, renvoyer une réponse d'erreur appropriée au client.
        return res.sendStatus(500);
      }      


      break;

    case 'payment_intent.created':
      // Traiter l'événement de création d'un nouvel intent de paiement
      console.log(`intention de paiement crée : ${event.type}`);
      break;

    default:
      console.log(`Type d'événement non géré : ${event.type}`);
  }


  // Renvoyer une réponse 200 pour accuser réception de l'événement
  res.sendStatus(200);
  ;
}






















//const endpointSecret = "whsec_ab35813a4509298cdec61cee5c63ecf776ed8ec0f201facb38a9f12a067e694b";





