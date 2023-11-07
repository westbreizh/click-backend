const rateLimit = require('express-rate-limit'); // package pour prévenir des attaques par force brute


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limite chaque IP à 5 requêtes par fenêtre
  message: "Trop de tentatives de connexion, veuillez réessayer dans un quart d'heure."
});

      
 module.exports = limiter;