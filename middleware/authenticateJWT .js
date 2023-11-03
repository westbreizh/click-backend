// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;
const jwt = require('jsonwebtoken');


const cookie = require('cookie');

// Middleware d'authentification et d'autorisation basé sur les JWT avec récupération du token depuis le cookie
const authenticateJWT = (req, res, next) => {
  // Analyser les cookies de la requête
  const cookies = cookie.parse(req.headers.cookie || '');

  // Récupérer le token du cookie 'mon_token'
  const token = cookies.mon_token;

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    const decodedToken = jwt.verify(token, Token_Secret_Key);

    // Vous pouvez ajouter des vérifications supplémentaires ici selon vos besoins
    // Par exemple, vérifier si l'utilisateur existe dans la base de données, ses autorisations, etc.

    // Passer les informations du token décodé à la demande pour une utilisation ultérieure
    req.user = decodedToken;
    console.log("l'authentification via le token réussie")
    next(); // Si l'authentification et l'autorisation sont réussies, on passe à l'étape suivante
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = authenticateJWT;
