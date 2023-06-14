


//const rateLimit = require("./middleware/rate-limit"); 
const userRoutes = require('./routes/user');
const clubRoutes = require('./routes/club');
const shopRoutes = require ('./routes/shop')
const stripeRoutes = require ('./routes/stripes')




//creation de l’application au sein du serveur, tour de controle.
const express = require('express'); 
const path = require('path');         
const helmet = require('helmet'); 
const cors = require('cors');





// Création de l'application express
// on intercepte les requetes, appliquer différents middleware 
//de sécurité et de configuartion à l'ensemble des situations,


const app = express();
// Activer les en-têtes CORS pour toutes les requêtes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));





// Middleware Header pour contourner les erreurs en débloquant certains systèmes
// de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});


 //middleware qui analyse, intercepte, les requêtes string 
 //ou array et met les données analysées dans req.body
app.use(express.urlencoded({extended: true}));    


//middleware qui analyse, intercepte, les requêtes JSON 
//entrantes et met les données analysées dans req.body.
app.use(express.json()); 


// utilisation du module 'helmet' pour la sécurité en protégeant les entetes d'ou le nom casque ...
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
//limitation du nombre de requetes, prevention d'attaque par force brute
//app.use(rateLimit); 


// Middleware permettant de charger les fichiers qui sont dans le repertoire images,

app.use(express.static('public/images'));
app.use(express.static('public/logo'));



// après avoir intercepter les requetes, appliquer différents middleware de sécurité et de configuartion à l'ensemble des situations,
// on aiguille celle-ci vers fichier voulu pour suite de traitement
// intercepte requête avec le début du nom de la route et ensuite dirige vers le routeur
app.use('/api/user', userRoutes); 
app.use('/api/shop', shopRoutes); 
app.use('/api/club', clubRoutes); 
app.use('/api/stripe', stripeRoutes); 






module.exports = app;