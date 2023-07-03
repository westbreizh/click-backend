const express = require('express');
const app = express();

// Gestion des fichiers statiques (images) sans code logique
app.use(express.static('public/logo'));
app.use(express.static('public/string'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));

// Importation des chemins pour les routes
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');
const stripeRoutes = require('./routes/stripes');

// Middleware pour traiter les données JSON et les données d'un formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Utilisation des routes pour les différentes fonctionnalités
app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/stripe', stripeRoutes);

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