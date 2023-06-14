const passwordValidator = require("password-validator")

const schema = new passwordValidator();
 
schema
.is().min(3)                                    // Taille minimum 3
.is().max(20)                                  // Taille maximum 20
.has().uppercase()                              // Doit contenir des lettres majuscules
.has().lowercase()                              // Doit contenir des lettres minuscules
.has().digits(1)                                // Doit au moins avoir 2 chiffres
.has().not().spaces()                           // Ne doit pas contenir d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklister ces valeurs
 
module.exports = schema;
