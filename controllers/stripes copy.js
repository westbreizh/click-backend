const stripe = require('stripe')('sk_test_51NGdYqI8HrVwrRfPKAmQ17TgZh2yWZtGjNNqhHyMXhebWNh03YR5zgGhibzt5oHJM1eRD5UrwRAvhZPNhs48fC9L00UjaCIuJq');
const YOUR_DOMAIN = 'https://click-and-raquette.com';



//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")

// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")

// fonction d'une session stripe 
exports.createCheckOutSession = async (req, res) => {
  console.log("je rentre dans stripe backend");

  try {

    const totalPriceString = req.body.totalPrice;
    const totalPrice = Number(totalPriceString.replace(",", "."));
    const unitAmount = totalPrice * 100;

    const articleList = JSON.parse(req.body.articleList).map(article => ({
      id: article.id,
      categorie: article.categorie,
      price: article.price,
      quantity: article.quantity
    }));

    console.log(req.body.articleList)
    console.log(articleList)


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
      metadata: {
        articleList: JSON.stringify(articleList),
        totalPrice: totalPrice.toFixed(2),
      },

    });

    console.log("je suis dans stripe avant redirection");
    res.redirect(303, session.url);

  } catch (error) {
    console.error('Une erreur est survenue lors de la création de la session de paiement', error);
    res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
  }
};



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


// Endpoint de webhook pour recevoir les événements de Stripe et enclencher les actions appropriées
//const endpointSecret = "whsec_ab35813a4509298cdec61cee5c63ecf776ed8ec0f201facb38a9f12a067e694b";
// Endpoint de webhook pour recevoir les événements de Stripe et enclencher les actions appropriées
endpointSecret = "whsec_Ke9pttMulkrvQP9cs81ARzNP3rw3eLqV";

exports.actionAfterPaiement = async (request, response) => {

  console.log("je rentre dans webhook");


  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    console.log("signature" +signature)
    try {
      event = stripe.webhooks.constructEvent(
        console.log("request.body" +request.body),
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Traitement de l'événement en fonction de son type
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log(`intention de paiement réalisé : ${event.type}`);
      saveInvoiceToDatabase(event.data.object);

      try {
        await sendEmail(event.data.object.customer_email, 'Confirmation de paiement', {
          customerName: event.data.object.customer_name,
          amount: event.data.object.amount / 100,
          paymentDate: new Date(event.data.object.created * 1000).toLocaleDateString('fr-FR'),
          paymentMethod: event.data.object.payment_method_types[0],
        }, './email/template/confirmationPaiementEmail');
      } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        // Vous pouvez choisir comment gérer l'erreur, par exemple, renvoyer une réponse d'erreur appropriée au client.
        return response.sendStatus(500);
      }      

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
  response.sendStatus(200);
};















