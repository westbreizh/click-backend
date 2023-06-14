// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // On extrait le token du header "Authorization" en prenant la partie située après l'espace
    const decodedToken = jwt.verify(token, Token_Secret_Key); // On décode le token en utilisant la clé secrète
    
    //cette partie n'est pas forcément utile? je n'envoie pas l'id utilisateur donc ne peut les comparer...
    const id_user = decodedToken.userId; // On extrait l'ID de l'utilisateur du token décodé
    if (req.body.id_user && req.body.id_user !== id_user) { // Si la demande contient un ID utilisateur et qu'il est différent de celui extrait du token
      throw new Error('Mauvais ID utilisateur');
    } else {
      next(); // Si l'ID utilisateur est valide, on passe à l'étape suivante
    }


  } catch {
    res.status(401).json({
      error: new Error('Autorisation non valide') // En cas d'erreur de vérification du token, on renvoie une erreur d'autorisation
    });
  }
};


/*
Lorsque vous utilisez jwt.verify(token, Token_Secret_Key), la fonction verify du module
 jsonwebtoken effectue les étapes suivantes pour vérifier le token décodé :
Tout d'abord, il vérifie la signature du token en utilisant la clé secrète fournie 
(Token_Secret_Key dans votre cas). La signature est une partie du token qui garantit
 son intégrité et son authenticité.
Ensuite, il vérifie si le token a expiré. Chaque token JWT contient une date d'expiration
 (exprimée en temps Unix) qui détermine sa validité dans le temps.
Il vérifie également d'autres revendications (claims) facultatives du token,
 telles que l'audience (aud), l'émetteur (iss), etc., si elles sont spécifiées 
 lors de la création du token.
Si toutes ces vérifications sont réussies, cela signifie que le token est valide 
et peut être considéré comme authentique. Dans ce cas, la fonction verify renvoie
 l'objet décodé qui contient les informations du token (par exemple, 
  les revendications du payload).
En résumé, jwt.verify() utilise la clé secrète pour vérifier la signature du token 
et effectue d'autres vérifications (expiration, revendications, etc.) pour s'assurer de 
la validité et de l'intégrité du token décodé. Si toutes les vérifications réussissent,
 la fonction renvoie l'objet décodé, sinon elle génère une erreur.
*/