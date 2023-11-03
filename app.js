// Importation des modules nécessaires
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 


// Middleware pour gérer les autorisations CORS
const cors = require('cors');
app.use(cors());

// Middleware pour analyser les données encodées dans l'URL (par exemple, les formulaires)
app.use(express.urlencoded({ extended: true }));

// Utilisez cookieParser pour gérer les cookies
app.use(cookieParser()); 
console.log("req.cookies :", req.cookies);
console.log("Identifiant de session dans app :", req.cookies.sessionId);

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




//const helmet = require('helmet');
//app.use(helmet({
//  crossOriginResourcePolicy: false,
//}));
// Middleware CORS
//app.use(cors({
 // origin: ['https://click-and-raquette.com', 'http://localhost:3000'],
//}));
//const path = require('path');

/* gestion des différentes origines de communications back frontend 
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
*/