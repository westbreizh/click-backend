// creation du serveur qui accuille notre backend constuit via le framewrok express
// configuration du port de notre ordinateur qui va ecouter les futurs requêtes clients
// et mise sur ecoute du serveur

const http = require('http'); // Import du package http (https requiert un certificat SSL à obtenir avec un nom de domaine)
const app = require('./app');


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






app.get('/cool', (req, res) => res.send(cool()))




const port = normalizePort(process.env.PORT || '5001');
app.set('port', port);

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

//fonction "createserver" permettant de créer un serveur 
//(prend "app" en argument, notre application crée via le module le framework  express)

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {        // L'écouteur d'évènements enregistre le port nommé                            
  const address = server.address();   //sur lequel le serveur s'exécute dans la console
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind, '  🍾🍾');
});

server.listen(port);
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

















