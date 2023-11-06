// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;
const jwt = require('jsonwebtoken');

// Middleware d'authentification et d'autorisation, le token et le xsrfToken sont vérifiés
const authenticateJWTandXSRF = (req, res, next) => {
  const token = req.cookies.token; // On extrait le token du cookie  
  const xsrfTokenHeader = req.headers['x-xsrf-token']; // On extrait le xsrfToken de l'en-tête
  console.log("req.header",req.headers)
  console.log("token : " + token)
  console.log("xsrfTokenHeader : " + xsrfTokenHeader)

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    const decodedToken = jwt.verify(token, Token_Secret_Key ); // On décode le token

    if (!xsrfTokenHeader || decodedToken.xsrfToken !== xsrfTokenHeader) { // On vérifie que le xsrfToken du payload et celui de l'en-tête correspondent
      return res.status(403).json({ error: 'Requête non autorisée' });
    }

    // Passer les informations du token décodé à la demande pour une utilisation ultérieure
    req.user = decodedToken;
    console.log("l'auhentification via le token réussi")
    next(); // Si l'authentification et l'autorisation sont réussies, on passe à l'étape suivante
  } catch (error) {
    console.log("problème identification token middleware ...")
    return res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = authenticateJWTandXSRF;