// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();
const bcryptSalt = process.env.bcryptSalt;
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;
const clientURL = process.env.CLIENT_URL;


// extension pour crytpé, décrypté comparé le mot de passe
const bcryptjs = require('bcryptjs');  
const crypto = require("crypto");


// module pour générer un jeton, un token 
const jwt = require('jsonwebtoken');


//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")


// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")





// fonction de creation d'un compte 
exports.signup = (req, res ) => {

  // verifie que l'email est disponible
  db.query(`SELECT * FROM player WHERE email='${req.body.email}'`, 
  (err, results) => {

    // email deja utilisé
    if (results.length > 0) {                           
        return res.status(422).json({message: 'Email non disponible l\'ami ! '});

    // email disponible
    }else{  

      bcryptjs.hash(req.body.password, Number(bcryptSalt))
      .then(cryptedPassword => {
        
        //implemente la base de donnée
        db.query(`INSERT INTO player (civilite, lastname, forename, email, password) VALUES
           ( '${req.body.civilite}','${req.body.lastname}', '${req.body.forename}', 
           '${req.body.email}', '${cryptedPassword}' )`,
          (err, result) => {        

            //recupère l'id pour création du token
            db.query(`SELECT * FROM player WHERE email='${req.body.email}'`, 
              (err, result) => {
                const userId = result[0].id;
                const token = jwt.sign(        
                  { userId: userId },
                  Token_Secret_Key, 
                  { expiresIn: '24h' }
                );
                delete (result[0].password);
                //on retourne des datas et le message
                return res.status(201).json(data = {
                  userInfo: result[0],
                  token: token,
                  message: 'Votre compte a bien été crée !'
                });

            })
          }
        )
      })
    }    
  })
} 


//fonction de connexion,
exports.login = (req, res, next) => {

  // on essaie de récupèrer le joueur dans la bdd
  db.query(`SELECT * FROM player WHERE email='${req.body.email}'`,
    (err, result) => {
       // email trouvé
      if (result.length > 0) { 
        bcryptjs.compare(req.body.password, result[0].password) 
          .then(valid => {

            // mot de passe non valide
            if (!valid) {         
              res.status(401).json({
              message: 'Le mot de passe est incorrect !'
               });

            // mot de passe ok
            }else {          

              //recupère l'id pour création du token
              db.query(`SELECT * FROM player WHERE email='${req.body.email}'`, 
                (err, result) => {
                  const userId = result[0].id;
                  const token = jwt.sign(        
                  // 1ère argument : Les données que vous souhaitez inclure dans le JWT, ici l'identifiant de l'utilisateur
                  { userId: userId },
                  // 2ème argument : La clé secrète utilisée pour signer le JWT (vous devez définir votre propre clé secrète)
                  Token_Secret_Key,
                  // 3ème argument : Options du JWT, ici vous spécifiez que le token expire après 4 heures
                  { expiresIn: '4h' }
                  );
                  delete (result[0].password);
                  const userInfo = result[0];

                  //on essaie de retrouver l'adresse du joueur si elle est renseigné
                  db.query(`SELECT * FROM address WHERE inHabitant='${userId}'`, 
                  (err, result) => {
                    const userAddress = result[0]
                    console.log(userAddress)
                    console.log(userInfo)


                    //on retourne des datas et le message
                    return res.status(201).json(data = {
                      userInfo: userInfo,
                      userAddress: userAddress,
                      token: token,
                      message: 'connexion au site réussie !'
                    });
                  })
                }
              )
            };
          })

      } else {          //email non trouvé
          res.status(404).json({
            message: 'L\'email est inconnu !'
          })
        }
  })
}


// création ou modification  de l'adresse et téléphone, payload : l'adresse et téléphone
exports.createOrUploadCoordinate= (req, res ) => {

  db.query(`SELECT * FROM address WHERE inHabitant ='${req.body.playerId}'`,
    (err, result) => {

      // l'utilisateur a été retrouvé dans la table address on modifie l'addrese et le telephone
      if (result.length > 0) { 
        console.log("on va modifié")
        db.query(
          `UPDATE player 
           SET telephone =  '${req.body.telephone}' 
           WHERE id = ${req.body.playerId}  `
          )
        db.query(
          `UPDATE address
            SET road =  '${req.body.road}',
            city = '${req.body.city}',
            postalCode = '${req.body.postalCode}'
            WHERE inHabitant = ${req.body.playerId}  `
          )
                          
      // l'utilisateur n'a pas été retrouvé dans la table address on crée l'adresse et ajoute ou modifie le téléphone
      }else{ 
        db.query(
        `UPDATE player 
         SET telephone =  '${req.body.telephone}' 
         WHERE id = ${req.body.playerId}  `
        )
        db.query(
          `INSERT INTO address
          (road, city, postalCode, inHabitant) 
          VALUES ( '${req.body.road}','${req.body.city}', '${req.body.postalCode}','${req.body.playerId}' )`
        )
      }
  })

  // une fois les données enregistrées dans les tables on les récupères pour les retournées au frontend ...
  //table player
  db.query(`SELECT * FROM player WHERE id='${req.body.playerId}'`, 
    (err, result) => {

      delete (result[0].password);
      const userInfo = result[0];

      //table adress
      db.query(`SELECT * FROM address WHERE inHabitant='${req.body.playerId}'`, 
      (err, result) => {
        const userAddress = result[0]
        console.log(userAddress)
        console.log(userInfo)

        //on retourne des datas et le message
        return res.status(201).json(data = {
          userInfo: userInfo,
          userAddress: userAddress,
          message: 'modification de coordonnées réussie !'
        });
      })
    }
  )
}


//envoie d'un email pour réinitialisation du mot de passe, payload l'email associé au compte
exports.sendEmailToResetPassword = (req, res ) => {

  const email = req.body.email

  db.query(`SELECT * FROM player WHERE email='${email}'`,
    (err, result) => {

      // email trouvé
      if (result.length > 0) {          
        
        // on génère un nouveau token 
        let resetToken = crypto.randomBytes(32).toString("hex");
        // on le hash pour pouvoir le stocker dans la table token
        bcryptjs.hash(resetToken, Number(bcryptSalt))
        .then(cryptedPassword => {
        })

        
        const link = `${clientURL}/passwordReset/token=${resetToken}/id=${result[0].id}`;
        console.log(link)
        console.log(resetToken)


        sendEmail(
          email,
          "réinitialisation du mot de passe, l'équipe Click & Raquette",
          {
            name: result[0].forename,
            link: link,
          },
           "./email/template/emailToResetPassword.handlebars"
        );
        
        return res.status(201).json(data = {
          userId: result[0].id,
          token: resetToken,
          message: 'un email de réinitialisation a été envoyé !'
        });



      } else {          //email non trouvé
        res.status(404).json({
            message: 'L\'email est inconnu sorry try again!!'
      })}

    if (err) {
      return res.status(500).json({message :"une erreur avec le serveur s'est produite!"});
    }
  })
}


// fonction qui renvoit la liste des commandes effectué son historique
exports.sendOrderLog = (req, res, next) => {
  console.log("req.body", req.body);

  db.query(`SELECT order_id FROM invoices WHERE customer_email='${req.body.email}'`, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur s'est produite sur le serveur." });
    }

    const ordersId = result.map((row) => row.order_id);
    console.log("ordersId", ordersId);

    // Récupération des informations associées à chaque orderId
    const ordersInfo = [];
    let count = 0;

    ordersId.forEach((orderId) => {
      db.query(`SELECT orderDate, statusOrder, id, totalPrice FROM orders WHERE id='${orderId}'`, (err, result) => {
        count++;

        if (err) {
          console.error(err);
          
        } else {
          ordersInfo.push(result[0]); // Ajouter les informations de la commande à la liste ordersInfo
        }

        // Vérifier si toutes les requêtes ont été traitées
        if (count === ordersId.length) {
          // Envoi des données et du message au frontend
          return res.status(201).json({
            data: {
              ordersInfo: ordersInfo
            },
            message: 'Données de commande récupérées avec succès!'
          });
        }
      });
    });
  });
};


// fonction qui renvoit une commande précise
exports.sendOneOrder = (req, res, next) => {
  const orderId = req.body.orderId
  console.log("req.body.orderId", orderId);
    db.query(`SELECT * FROM orders WHERE id='${orderId}'`, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const orderInfo = result; // Ajouter les informations de la commande à la liste ordersInfo
        return res.status(201).json({
          data: {
            orderInfo: orderInfo
          },
          message: 'Données de commande récupérées avec succès!'
        });
      }
    });
};









// suprresion utilisateur de la DB
exports.deleteUser = (req, res, next) => {
  let userId = req.params.id
  userId= userId.substring(1)
  db.query(`DELETE FROM users WHERE id = ${userId}`, 
  (error, result) => {

    db.query(`DELETE FROM posts WHERE id_user = ${userId}`, 
    (error, result) => {

        db.query(`DELETE FROM comments WHERE id_user = ${userId}`, 
        (error, result) => {
            if (error) {
            return res.status(400).json({
                error
            });
            }
            return res.status(200).json({
                message : "le compte a bien été supprimé de user ainsi que les post et les commentaires !"
            });
        })
    })
        
  });
}


//changement d'e-mail 
// payload l'ancien et le nouveau e-mail
exports.changeEmail = (req, res ) => {

  db.query(`SELECT * FROM player WHERE email='${req.body.email}'`,
    (err, result) => {

      // email trouvé
      if (result.length > 0) {
         
        db.query(`SELECT * FROM player WHERE email='${req.body.new_email}'`, (err, results) => {
          
          // new email deja utilisé         
          if (results.length > 0) {     
            return res.status(401).json({message: 'Email non disponible l\'ami ! '});
            } 

            // new email disponible et on le remplace dans la table user
            else {                    
              db.query(` UPDATE player   SET email = '${req.body.new_email}' 
               WHERE email='${req.body.email}'   `, (err, results) => {
                return res.status(201).json({ message: 'Votre e-mail a bien été modifié !'});      
              })
            } 
        }) 

      //email non trouvé
      } else {          
        res.status(404).json({
            message: 'L\'email est inconnu sorry try again!!'
      })}

      if (err) {
        return res.status(500).json({message :"une erreur avec le serveur s'est produite!"});
      }  
    }
  )
}


//changement de mot de passe  
//payload l'email, l'ancien et le nouveau mot de passe
exports.changePassword = (req, res, next) => {

  db.query(`SELECT * FROM player WHERE email='${req.body.email}'`,
    (err, result) => {

      //verification de l'ancien mot de passe
      bcryptjs.compare(req.body.password, result[0].password) //  
      .then(checkOldPassword => {

         // verification de l'ancien mot de passe ok
        if (checkOldPassword) {        
          bcryptjs.hash(req.body.new_password, 10)   
            .then(cryptedPassword => {
              db.query(` UPDATE player   SET password = '${cryptedPassword}'  WHERE email='${req.body.email}' `,
              (err, results) => {
                return res.status(201).json({ message: 'le mot de passe a bien été modifié !'})
              })
            })

         // verification de l'ancien mot de passe faux
        }else {          
          res.status(401).json({    
            message: 'Le mot de passe que vous souhaitez réinitialiser est incorrect !'
          })
        }

      })

    if (err) {
      return res.status(500).json({message :"une erreur avec le serveur s'est produite!"});
    }  
  })
}


// fonction qui enregistre les prérences du joueur pour le cordage
exports.registerPreferencePlayer = (req, res ) => {

  console.log(req.body)
  // on recherche l'utilisateur via l'email
  db.query(`SELECT * FROM player WHERE email='${req.body.email}'`, 
    (err, results) => {

      // on bien retrouvé notre player
      if (results.length > 0) {                           
console.log("preference jouer email trouvé")
      // bug player non trouvé ou pas connecté
      }else{  
        console.log("preference jouer email pas trouvé")
      } 
    }
  )
}


// obtenir un user via l'id 
exports.getOneUser = (req, res, next) => {
  let userId = req.params.id
  userId= userId.substring(1)
  db.query(`SELECT * FROM users   WHERE id = ${userId}`, 
            (error, result) => {
    if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(
          result);
      });
};



  



