const express = require('express'); //importe express
const app = express();  //création de mon application sur le serveur via 

const cors = require('cors'); // Importe la bibliothèque Cors pour gérer les CORS
app.use(cors()); // Utilise Cors comme middleware pour toutes les requêtes

// Middleware pour gérer les en-têtes de requête CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines (à ajuster en fonction de vos besoins de sécurité)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Autorise les méthodes spécifiées
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Autorise les en-têtes spécifiés
  next();
});


// gestion des images, fichier statiques sans codes logiques
app.use(express.static('public/logo'));
app.use(express.static('public/string'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));


// Middleware pour analyser les données de requête URL encodées
app.use(express.urlencoded({ extended: true })); 
// Middleware pour analyser les données de requête JSON
app.use(express.json()); 


// importe la logique pour les routes
const userRoutes = require('./routes/user');
const shopRoutes = require ('./routes/shop')
const stripeRoutes = require ('./routes/stripes')

// Utilise les routes des utilisateurs pour tous les chemins commençant par '/api/..'
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
