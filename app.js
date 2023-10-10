const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NGdYqI8HrVwrRfPKAmQ17TgZh2yWZtGjNNqhHyMXhebWNh03YR5zgGhibzt5oHJM1eRD5UrwRAvhZPNhs48fC9L00UjaCIuJq');


// gestion des différentes origines de communications back frontend
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware pour l'analyse des données encodées dans l'URL, comme pour des formulaires
app.use(express.urlencoded({ extended: true }));

// gestion des images, fichier statiques sans codes logiques
app.use(express.static('public/logo'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));
app.use(express.static('public/string/technifibre'));
app.use(express.static('public/string/babolat'));
app.use(express.static('public/string/yonex'));
app.use(express.static('public/string/dunlop'));

app.use(express.urlencoded({ extended: true }));


// importe le chemin pour les routes
// player contient quelues endpoint généraus du coup c'est mentionnés user
const userRoutes = require('./routes/player');
const shopRoutes = require ('./routes/shop')
const stripeRoutes = require ('./routes/stripes')
const stringerRoutes = require ('./routes/stringer')
app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/stringer', stringerRoutes);


app.get('/', (req, res) => {
  res.send('Hello, world!');
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