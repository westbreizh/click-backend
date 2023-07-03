// Fichier server.js
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_...');
const db = require("./BDD/database-connect")

const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// La fonction normalizePort renvoie un port valide (numéro ou chaîne)
// Cela configure le port de connexion en fonction de l'environnement
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Gestion de la route '/cool'
app.get('/cool', (req, res) => res.send(cool()));

// Normalisation du port
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Gestion des erreurs du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur HTTPS
const server = https.createServer(options, app);

// Gestion des erreurs et démarrage du serveur
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind, '  🍾🍾');
});

server.listen(port, () => {
  console.log(`Serveur HTTPS démarré sur le port ${port}`);
});


// Gestion des images, fichiers statiques sans code logique
app.use(express.static('public/logo'));
app.use(express.static('public/string'));
app.use(express.static('public/ball'));
app.use(express.static('public/accessorie'));

// Importe les routes
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');
const stripeRoutes = require('./routes/stripes');

// Configuration du middleware pour le parsing des données
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Gestion de la route racine
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Utilisation des routes pour les différentes fonctionnalités
app.use('/api/user', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/stripe', stripeRoutes);

module.exports = app;
