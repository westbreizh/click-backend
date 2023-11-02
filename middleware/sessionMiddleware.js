const { v4: uuidv4 } = require('uuid');

// Middleware de génération d'identifiant de session
const sessionMiddleware = (req, res, next) => {
  if (!req.cookies.sessionId) {
    const sessionId = uuidv4(); // Générez un nouvel identifiant de session unique
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: true, // Utilisez HTTPS pour sécuriser la communication
    });
  }
  next();
};

module.exports = sessionMiddleware;
