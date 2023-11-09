// Importation des modules nécessaires
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 
const helmet = require('helmet');

// Middleware pour gérer les sessions, le prowy de heroku ok pas tres clair ...
app.set('trust proxy', 1);



// middleware pour definir les en-têtes de sécurité
app.use((req, res, next) => {
  // Définit l'en-tête Content-Security-Policy
  res.setHeader("Content-Security-Policy", "default-src 'self'");

  // Définit l'en-tête X-Frame-Options
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Supprime l'en-tête X-Powered-By
  res.setHeader("X-Powered-By", "");

  // Active Strict Transport Security (HSTS)
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Définit l'en-tête X-Content-Type-Options
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Définit l'en-tête Cache-Control
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  next();
});



// Middleware pour gérer les autorisations CORS
const cors = require('cors');
const corsOptions = {
  origin: ['https://click-and-raquette.com', 'http://localhost:3000', 'https://api.stripe.com'], // Spécifiez l'origine autorisée
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées
  credentials: true, // Permet d'envoyer des cookies et des en-têtes d'authentification
};

app.use(cors(corsOptions));

// Middleware pour analyser les données JSON pour toutes les routes
app.use(express.json());

// Middleware pour analyser les données encodées dans l'URL (par exemple, les formulaires)
app.use(express.urlencoded({ extended: true }));

// Utilisez cookieParser pour gérer les cookies
app.use(cookieParser()); 

// Middleware pour servir des fichiers statiques (images, etc.)
app.use(express.static('public/logo'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));
app.use(express.static('public/string/tecnifibre'));
app.use(express.static('public/string/babolat'));
app.use(express.static('public/string/yonex'));
app.use(express.static('public/string/dunlop'));
app.use(express.static('public/string/head'));
app.use(express.static('public/string/luxilon'));

// Importation des routes
const userRoutes = require('./routes/player');
const shopRoutes = require('./routes/shop');
const stripeRoutes = require('./routes/stripes');
const stringerRoutes = require('./routes/stringer');

// Configuration des routes
app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/stringer', stringerRoutes);



// Export de l'application Express pour une utilisation ailleurs
module.exports = app;




