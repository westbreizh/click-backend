const express = require('express');
const app = express();


app.use((req, res, next) => {
  if (req.path === '/api/stripe/webhook') {
    console.log("J'évite bien le passage de express.json");
    next(); // Passe à la prochaine middleware sans analyser le JSON
  } else {
    console.log("Je passe dans le middleware json");
    express.json()(req, res, next); // Analyse JSON pour toutes les autres routes
  }
});

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








app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/stripe', stripeRoutes);


module.exports = app;
