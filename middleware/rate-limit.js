const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limite chaque IP à 5 requêtes par fenêtre
  handler: function(req, res, /*next*/) {
    res.status(429).json({message: "Trop de tentatives de connexion, veuillez réessayer dans un quart d'heure."});
  }
});

module.exports = limiter;