// Importation des modules nécessaires
const dotenv = require("dotenv");   
const jwt = require('jsonwebtoken');

// Chargement des variables d'environnement du fichier .env dans process.env
dotenv.config();

// Récupération de la clé secrète du token à partir des variables d'environnement
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;

// Middleware d'authentification et d'autorisation basé sur les JWT
const authenticateJWT = (req, res, next) => {
  // On extrait le token du header "Authorization" en prenant la partie située après l'espace
  const token = req.headers.authorization?.split(' ')[1]; 

  // Si le token n'est pas présent dans la requête, on renvoie une erreur
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    // On décode le token en utilisant la clé secrète, c'est cette fonction qui vérifie la validité du token reçu
    const decodedToken = jwt.verify(token, Token_Secret_Key ); 

    // On passe les informations du token décodé à la requête pour une utilisation ultérieure
    req.user = decodedToken;
    console.log("l'authentification via le token réussi")

    // Si l'authentification et l'autorisation sont réussies, on passe à l'étape suivante
    next(); 
  } catch (error) {
    // Si la vérification du token échoue, on renvoie une erreur
    return res.status(401).json({ error: 'Token invalide' });
  }
};

// Exportation du middleware pour pouvoir l'utiliser dans d'autres fichiers
module.exports = authenticateJWT;