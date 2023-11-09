// Importation des modules nécessaires
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 
const helmetMiddleware = require('./middleware/helmetConfig');  

// Middleware pour gérer les sessions, le prowy de heroku ok pas tres clair ...
app.set('trust proxy', 1);

// Utilisation du middleware Helmet pour définir des en-têtes HTTP sécurisés
app.use(helmetMiddleware);
app.use((req, res, next) => {
  console.log('Helmet middleware used');
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




