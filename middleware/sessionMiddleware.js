const { v4: uuidv4 } = require('uuid');

// Middleware de génération d'identifiant de session
const sessionMiddleware = (req, res, next) => {
  let sessionId = req.cookies.sessionId; // Déclarer la variable sessionId
  console.log("Identifiant de session avant :", req.cookies.sessionId);

  if (!req.cookies.sessionId) {
    sessionId = uuidv4(); // Générez un nouvel identifiant de session unique
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: true, // Utilisez HTTPS pour sécuriser la communication
    });
  }
  
  // Accédez à la variable sessionId même en dehors du bloc if
  console.log("req.cookies :", req.cookies);
  console.log("Identifiant de session existant ou généré :", sessionId);
  next();
};

module.exports = sessionMiddleware;






/*const { v4: uuidv4 } = require('uuid');

// Middleware de génération et de vérification de l'identifiant de session
const sessionMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  // Si l'identifiant de session n'existe pas ou n'est pas valide, générer un nouvel identifiant
  if (!sessionId || !isValidSession(sessionId)) {
    const newSessionId = uuidv4();
    res.cookie('sessionId', newSessionId, {
      httpOnly: true,
      secure: true,
    });
  }

  next();
};

// Fonction pour vérifier la validité de l'identifiant de session
function isValidSession(sessionId) {
  // Implémentez votre logique de vérification ici
  // Vous pouvez vérifier si l'identifiant de session existe dans une base de données,
  // s'il n'a pas expiré, s'il est associé à un utilisateur authentifié, etc.
  // Si l'identifiant de session est invalide, renvoyez false ; sinon, renvoyez true.
  // Vous pouvez également gérer le blocage de l'accès aux ressources protégées ici.

  // Exemple de vérification de validité simple : retourne true si l'identifiant est non vide.
  return sessionId && sessionId.trim() !== '';
}

module.exports = sessionMiddleware;


*/