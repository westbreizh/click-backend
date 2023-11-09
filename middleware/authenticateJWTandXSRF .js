// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;
const jwt = require('jsonwebtoken');

// Middleware d'authentification et d'autorisation, 
// vérifiez que le token du cookies est bon via jwt.verifie d'une part ; token non disponible par js protection contre les attaques XSS
// et vérifiez que le xsrfToken du payload et celui de l'en-tête correspondent d'autre part protection contre les attaques CSRF
const authenticateJWTandXSRF = (req, res, next) => {

  const token = req.cookies.token; // On extrait le token du cookie renvoyé par le navigateur
  //console.log("token du cookies envoyé direct par le nav: " + token)  
  
  const xsrfTokenHeader = req.headers['x-xsrf-token']; // On extrait le xsrfToken de l'en-tête venant du frontend
  //console.log("xsrfTokenHeader venant du frontend : " + xsrfTokenHeader)

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    // On décode et veifie le token du cookies qui contient deux elements 
    const decodedToken = jwt.verify(token, Token_Secret_Key ); 
   // console.log("decodedToken : " + decodedToken)


    const xsrfTokenCookie = decodedToken.xsrfToken;
    //console.log("xsrfToken du cookies  du token décodé : " + xsrfTokenCookie);

    const userId = decodedToken.userId;
    //console.log("userId : " + userId)

    // On vérifie que le xsrfToken du payload et celui de l'en-tête correspondent
    if (!xsrfTokenHeader || xsrfTokenCookie !== xsrfTokenHeader) { 
      return res.status(403).json({ error: 'Requête non autorisée contrôle xsrfToken pas bon ' });
    }

    // Passer les informations du token décodé à la demande pour une utilisation ultérieure
    req.user = userId;
    //console.log("l'auhentification via le token réussi")
    next(); // Si l'authentification et l'autorisation sont réussies, on passe à l'étape suivante
  } catch (error) {
    console.log("problème identification token middleware ...")
    return res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = authenticateJWTandXSRF;