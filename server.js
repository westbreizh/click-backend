
const app = require('./app');

//fonction "createserver" permettant de créer un serveur, prend "app" en argument, notre application crée via le module le framework  express
const server = http.createServer(app);


//La fonction normalizePort renvoie un port valide (numéro ou chaîne)
//Cela configure le port de connection en fonction de l'environnement
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
const port = normalizePort(process.env.PORT || '5001');
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
server.on('error', errorHandler);


// Événement déclenché lorsque le serveur commence à écouter
server.on('listening', () => {    
  // Récupération des informations sur l'adresse et le port sur lesquels le serveur écoute                              
  const address = server.address();  
    // Formatage du texte pour indiquer où le serveur est en écoute 
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind, '  🍾🍾');
});

// Démarrage du serveur en écoutant sur le port spécifié
server.listen(port);






















