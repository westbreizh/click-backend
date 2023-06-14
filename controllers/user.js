// extension pour crytpé, décrypté comparé le mot de passe
const bcryptjs = require('bcryptjs');  

const crypto = require("crypto");

// module pour générer un jeton, un token 
const jwt = require('jsonwebtoken');

// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();
const bcryptSalt = process.env.bcryptSalt;
const Token_Secret_Key = process.env.TOKEN_SECRET_KEY;
const clientURL = process.env.CLIENT_URL;

//module pour envoyer des emails
const nodemailer = require('nodemailer');

// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")

const sendEmail = require("../email/sendEmail")




// création ou modification  de l'adresse et téléphone
// payload : l'adresse et téléphone

exports.createOrUploadCoordinate= (req, res ) => {

  db.query(`SELECT * FROM address WHERE inHabitant ='${req.body.playerId}'`,
    (err, result) => {

      // on modifie l'addrese et le telephone
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
                          
      // on crée l'adresse et ajoute ou modifie le téléphone
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

  db.query(`SELECT * FROM player WHERE id='${req.body.playerId}'`, 
  (err, result) => {

    delete (result[0].password);
    const userInfo = result[0];

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
                    { userId: userId },
                    Token_Secret_Key, 
                    { expiresIn: '24h' }
                  );
                  delete (result[0].password);
                  const userInfo = result[0];


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










//envoie d'un email pour réinitialisation du mot de passe
// payload l'email associé au compte

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


// Modifier un profil utilisateur. 
exports.modifyOneUser = (req, res, next) => {
    let userId = req.params.id
    userId= userId.substring(1)

    if (req.body.file) {  // si j'ai un fichier image dans la requete
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.body.file.filename}`;  // req.protocol renvoie le http ou https,  req.get ('host') => donne le host de notre serveur (ici localhost 3001 en réel racine de notre serveur) ensuite dossier images et le nom du fichi
        console.log("je suis la ! ")
        console.log(imageUrl)
    }
    else {
        imageUrl = req.body.imageUrl; 
        console.log("je suis ici")
    }

    db.query(`UPDATE users 
    SET username = '${req.body.username}', texte = '${req.body.texte}', lastName = '${req.body.lastName}', forName = '${req.body.forName}', email = '${req.body.email}' 
    WHERE id = ${userId}`, 
    (error, result) => {
        console.log("juste après avoir enregistrer")

        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json({
        message: 'Votre profil à été modifié !'
    })});
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