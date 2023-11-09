const helmet = require('helmet');

// Configuration de Helmet
const helmetMiddleware = helmet({
  // Configuration de la politique de sécurité du contenu (Content Security Policy)
  contentSecurityPolicy: {
    directives: {
      // Seules les ressources du même origine (self) peuvent être chargées
      defaultSrc: ["'self'"],
      // Seules les images du même origine et de https://images.example.com peuvent être chargées
      imgSrc: ["'self'", "https://images.example.com"],
      // Seuls les scripts du même origine et de https://scripts.example.com peuvent être chargés
      scriptSrc: ["'self'", "https://scripts.example.com"],
    },
  },
  // Supprime l'en-tête X-Powered-By pour rendre plus difficile pour les attaquants de déterminer quel logiciel serveur vous utilisez
  hidePoweredBy: true,
  // Active Strict Transport Security (HSTS) pour demander aux navigateurs de n'utiliser que HTTPS
  hsts: true,
  // Définit l'en-tête X-Content-Type-Options pour aider à prévenir les attaques de type "sniffing" de type MIME
  noSniff: true,
  // Définit l'en-tête X-Frame-Options pour aider à prévenir les attaques de type "clickjacking"
  frameguard: true,
});

module.exports = helmetMiddleware;