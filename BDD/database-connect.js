
const mysql = require('mysql2');

// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();


const sqlConnectionCreate = mysql.createConnection({  // creation de la connection via le port, le nom d'utilisateur, mot de passe et le nom de la bdd, contenu dans le fichier env. chargé dans process.env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



sqlConnectionCreate.connect(function (err) { 
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connection à la base de donnée réussie 😄, on est au top l\'ami!');
});

module.exports = sqlConnectionCreate;