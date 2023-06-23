const express = require('express');
const app = express();

const cors = require('cors');
// Configurer les options CORS
const corsOptions = {
  origin: 'https://click-and-raquette.com', // L'origine autorisée
  optionsSuccessStatus: 200 // Facultatif: définir le statut de réussite pour les pré-vérifications OPTIONS
};

// Utiliser le middleware CORS
app.use(cors(corsOptions));



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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});




app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/stripe', stripeRoutes);


module.exports = app;
