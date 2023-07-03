const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());




// gestion des images, fichier statiques sans codes logiques
app.use(express.static('public/logo'));
app.use(express.static('public/string'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));


// importe le chemin pour les routes
const userRoutes = require('./routes/user');
const shopRoutes = require ('./routes/shop')
const stripeRoutes = require ('./routes/stripes')



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/stripe', stripeRoutes);


// Endpoint de webhook pour recevoir les événements de Stripe et enclencher les actions appropriées
webhookSecret = "whsec_Ke9pttMulkrvQP9cs81ARzNP3rw3eLqV";

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
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

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});



module.exports = app;



//const rateLimit = require("./middleware/rate-limit");
//const helmet = require('helmet');
//app.use(helmet({
//  crossOriginResourcePolicy: false,
//}));
// Middleware CORS
//app.use(cors({
 // origin: ['https://click-and-raquette.com', 'http://localhost:3000'],
//}));
//const path = require('path');