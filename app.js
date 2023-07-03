const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const shopRoutes = require ('./routes/shop')
const stripeRoutes = require ('./routes/stripes')


// gestion des images, fichier statiques sans codes logiques
app.use(express.static('public/logo'));
app.use(express.static('public/string'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));






app.use(express.urlencoded({ extended: true }));

// Middleware d'analyse JSON pour toutes les routes, à l'exception de la route webhook
app.use((req, res, next) => {
  if (req.originalUrl === 'https://click-backend.herokuapp.com/api/stripe/webhook') {
    console.log("jévite bien le passage de expressjson")
    next(); // Passe à la prochaine middleware sans analyser le JSON
  } else {
    console.log("je passe dans le middleware json")

    express.json()(req, res, next); // Analyse JSON pour toutes les autres routes
  }
});



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



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


app.get('/', (req, res) => {
  res.send('Hello, world!');
});