// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;
const jwt = require('jsonwebtoken');


// Middleware d'authentification et d'autorisation basé sur les JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // On extrait le token du header "Authorization" en prenant la partie située après l'espace
  console.log("token dans le middleware", token)
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    const decodedToken = jwt.verify(token, Token_Secret_Key ); // On décode le token en utilisant la clé secrète, c'est cette fonction qui verifie la validité du token reçu

    // Vous pouvez ajouter des vérifications supplémentaires ici selon vos besoins
    // Par exemple, vérifier si l'utilisateur existe dans la base de données, ses autorisations, etc.

    // Passer les informations du token décodé à la demande pour une utilisation ultérieure
    req.user = decodedToken;
    console.log("l'auhentification via le token réussi")
    next(); // Si l'authentification et l'autorisation sont réussies, on passe à l'étape suivante
  } catch (error) {
    console.log("problème identification token middleware ...")
    return res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = authenticateJWT;
