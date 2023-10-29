// Importation des modules nécessaires
const express = require('express');
const app = express();

// Middleware pour gérer les autorisations CORS
const cors = require('cors');
app.use(cors());

// Middleware pour analyser les données encodées dans l'URL (par exemple, les formulaires)
app.use(express.urlencoded({ extended: true }));

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