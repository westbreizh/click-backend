// Importation des modules nécessaires
const express = require('express');
const app = express();

// Importation de votre application Express depuis le fichier 'app.js'
const app = require('./app');

// La fonction normalizePort renvoie un port valide (numéro ou chaîne)
// Elle configure le port de connexion en fonction de l'environnement
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

// Récupération du port à partir de l'environnement ou utilisation de 5001 par défaut
const port = normalizePort(process.env.PORT || '5001');

// Configuration du port de l'application Express
app.set('port', port);

// Gestion des erreurs liées au serveur
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

// Création d'un serveur HTTP
const server = http.createServer(app);

// Gestion des erreurs du serveur
server.on('error', errorHandler);

// Écoute de connexions entrantes sur le port spécifié
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind, '  🍾🍾');
});

// Démarrage du serveur en écoutant sur le port spécifié
server.listen(port);
