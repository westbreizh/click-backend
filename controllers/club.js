// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")


// retourne l'ensemble  des clubs de manière aléatoire
exports.clubList = (req, res ) => {

    // on recherche la liste des marques dans la BDD
    db.query(`SELECT * FROM club ORDER BY RAND()`, 
      (error, results) =>{
        if (error){          
          res.status(404).json({
          message: 'erreur avec la base de donnée'
        })
        }
  
        {
          const clubList = results
          return res.status(201).json(results = {
          clubList: clubList,
          message: 'la liste  des clubs a été récupéré!'
          });
         }
      } 
    )
  
  }