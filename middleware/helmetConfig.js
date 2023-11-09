const helmet = require('helmet');

// Configuration de Helmet
const helmetMiddleware = helmet({
  // Configuration de la politique de sécurité du contenu (Content Security Policy)

  contentSecurityPolicy: {
    directives: {
      // dit au navigateur n'accepte que les elements de même origine provenant de votre site du frontend mais n'enpeche pas la communication entre backend et frontend
      defaultSrc: ["'self'"],
    },
  },
    // Définit l'en-tête X-Frame-Options pour aider à prévenir les attaques de type "clickjacking"
    frameguard: {
      action: 'sameorigin'
    },
  // Supprime l'en-tête X-Powered-By pour rendre plus difficile pour les attaquants de déterminer quel logiciel serveur vous utilisez
  hidePoweredBy: true,
  // Active Strict Transport Security (HSTS) pour demander aux navigateurs de n'utiliser que HTTPS
  hsts: true,
  // Définit l'en-tête X-Content-Type-Options pour aider à prévenir les attaques de type "sniffing" de type MIME, indiquant au navigateur de ne pas "sniffer" automatiquement le type MIME du contenu, mais plutôt de se fier à l'en-tête Content-Type fourni par le serveur.
  noSniff: true,
  // Définit l'en-tête Cache-Control
  noCache: true,

});

module.exports = helmetMiddleware;