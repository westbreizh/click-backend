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



//---------------------compte joueur, préférences, info joueurs-----------------------//

// fonction de creation d'un compte joueur   
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
        db.query(`INSERT INTO player (civilite, lastname, forename, email, password_hash ) VALUES
           ( '${req.body.civilite}','${req.body.lastname}', '${req.body.forename}', 
           '${req.body.email}', '${cryptedPassword}' )`,
          (err, result) => {        

            //recupère l'id pour création du token ...
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
// Fonction pour récupérer l'utilisateur à partir de l'adresse e-mail
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM player WHERE email='${email}'`, (err, playerResult) => {
      if (err) {
        reject(err);
        console.log("erreure dici ")
      } else {
        if (playerResult.length > 0) {
          resolve({ userType: 'player', userInfos: playerResult[0] });
        } else {
          db.query(`SELECT * FROM hub WHERE email='${email}'`, (err, hubResult) => {
            if (err) {
              reject(err);
            } else {
              if (hubResult.length > 0) {
                resolve({ userType: 'hub', userInfos: hubResult[0] });
              } else {
                db.query(`SELECT * FROM stringer WHERE email='${email}'`, (err, stringerResult) => {
                  if (err) {
                    reject(err);
                  } else {
                    if (stringerResult.length > 0) {
                      resolve({ userType: 'stringer', userInfos: stringerResult[0] });
                    } else {
                      resolve(null);
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  });
};
const getHubViaId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM hub WHERE id='${id}'`, (err, hubInfo) => {
      if (err) {
        reject(err);
        console.log("Erreur ici : ", err); // Afficher l'erreur dans la console
      } else {
        if (hubInfo.length > 0) {
          resolve(hubInfo[0] );
        } else {
          resolve(null);
        }
      }
    });
  });
};
const getHubBackViaId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM hub WHERE id='${id}'`, (err, hubBackInfo) => {
      if (err) {
        reject(err);
        console.log("Erreur ici : ", err); // Afficher l'erreur dans la console
      } else {
        if (hubBackInfo.length > 0) {
          resolve( hubBackInfo[0] );
        } else {
          resolve(null);
        }
      }
    });
  });
};
const getStringViaId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM string WHERE id='${id}'`, (err, stringFromShopInfo) => {
      if (err) {
        reject(err);
        console.log("Erreur ici : ", err); // Afficher l'erreur dans la console
      } else {
        if (stringFromShopInfo.length > 0) {
          resolve(stringFromShopInfo[0] );
        } else {
          resolve(null);
        }
      }
    });
  });
};

// Fonction de connexion
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email", email)

  try {
    // On essaie de récupérer l'utilisateur dans les tables player, hub et stringer
    const user = await getUserByEmail(email);

    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
      return res.status(404).json({ message: 'L\'email est inconnu !' });
    }

    // Vérifier le mot de passe
    const validPassword = await verifyPassword(password, user.userInfos.password_hash);
    if (!validPassword) {
      // Si le mot de passe n'est pas valide, renvoyer une erreur 401
      return res.status(401).json({ message: 'Le mot de passe est incorrect !' });
    }

    // Mot de passe correct, créer un token
    const userId = user.userInfos.id;
    const token = createToken(userId);

    // Supprimer le mot de passe de l'objet utilisateur avant de le renvoyer
    delete user.userInfos.password_hash;
    // Récupérer les informations du hub
    const hubId = user.userInfos.hub_id;
    const hubInfo = await getHubViaId(hubId);
    user.userInfos.hubInfo = hubInfo;
    // Récupérer les informations du hubBack
    const hubBackId = user.userInfos.hubBack_id;
    const hubBackInfo = await getHubBackViaId(hubBackId);
    user.userInfos.hubBackInfo = hubBackInfo;
    // Récupérer les informations du preference cordage
    const stringFromShopId = user.userInfos.stringFromShop_id;
    const stringFromShopInfo = await getStringViaId(stringFromShopId);
    user.userInfos.stringInfo = stringFromShopInfo;

    // Retourner les données et le message
    return res.status(201).json({
      userInfo: user.userInfos,
      token: token,
      message: 'Connexion au site réussie !',
    });
  } catch (err) {
    // En cas d'erreur, renvoyer une erreur 500
    return res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
};

// Fonction de création ou modification des coordonnées
 exports.createOrUploadCoordinate = (req, res) => {
  console.log("req.body", req.body);

  // Mise à jour de l'utilisateur existant
  db.query(
    `UPDATE player 
    SET telephone = '${req.body.telephone}', 
    road = '${req.body.road}',
    city = '${req.body.city}',
    postal_code = '${req.body.postalCode}'
    WHERE id = ${req.body.playerId}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des données." });
      }

      // Après la mise à jour, sélectionnez à nouveau les données mises à jour du joueur
      db.query(
        `SELECT * FROM player WHERE id = ${req.body.playerId}`,
        (selectErr, result) => {
          if (selectErr) {
            console.error(selectErr);
            return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des données mises à jour." });
          }
          
          // Envoyer les données mises à jour en réponse
          const updatedPlayerData = result[0];
          res.status(200).json({ message: "Mise à jour réussie.", updatedPlayerData });
        }
      );
    }
  );
};



// fonction qui enregistre les préférences du joueur pour le cordage
exports.savePreferencePlayer = (req, res) => {
  const { userId, stringFromPlayer, stringFromShopId, stringRopeChoice, hubChoiceId, hubBackChoiceId, racquetPlayer } = req.body;

  const stringFromPlayerValue = stringFromPlayer !== "null" ? stringFromPlayer : null;
  const stringFromShopIdValue = stringFromShopId !== "null" ? stringFromShopId : null;

  const updateQuery = `
    UPDATE player 
    SET stringFromShop_id = ?,
    string_rope = ?,
    hub_id = ?,
    hubBack_id = ?,
    racquet_player = ?,
    stringFromPlayer = ?
    WHERE id = ?
  `;

  const updateValues = [
    stringFromShopIdValue,
    stringRopeChoice,
    hubChoiceId,
    hubBackChoiceId,
    racquetPlayer,
    stringFromPlayerValue,
    userId
  ];

  db.query(updateQuery, updateValues, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des données." });
    } else {
      res.status(200).json({ message: "Mise à jour réussie." });
    }
  });
};

// Fonction qui recupère les données joueurs ave un email fournies 
exports.loadDataPlayerAfterModif = async (req, res, next) => {
  const email = req.body.email;
  console.log("email", email)

  try {
    // On essaie de récupérer l'utilisateur dans les tables player, hub et stringer
    const user = await getUserByEmail(email);

    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
      return res.status(404).json({ message: 'L\'email est inconnu !' });
    }

    // Supprimer le mot de passe de l'objet utilisateur avant de le renvoyer
    delete user.userInfos.password_hash;
    // Récupérer les informations du hub
    const hubId = user.userInfos.hub_id;
    const hubInfo = await getHubViaId(hubId);
    user.userInfos.hubInfo = hubInfo;
    // Récupérer les informations du hubBack
    const hubBackId = user.userInfos.hubBack_id;
    const hubBackInfo = await getHubBackViaId(hubBackId);
    user.userInfos.hubBackInfo = hubBackInfo;
    // Récupérer les informations du preference cordage
    const stringFromShopId = user.userInfos.stringFromShop_id;
    const stringFromShopInfo = await getStringViaId(stringFromShopId);
    user.userInfos.stringInfo = stringFromShopInfo;

    // Retourner les données et le message
    return res.status(201).json({
      updatedPlayerData: user.userInfos,
      message: 'on a bien récupérées les informations du player modifiées !',
    });
  } catch (err) {
    // En cas d'erreur, renvoyer une erreur 500
    return res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
};



// Fonction pour créer le jeton JWT
const createToken = (userId) => {
  return jwt.sign(
    { userId: userId },
    Token_Secret_Key,
    //{ expiresIn: '4h' }
        { expiresIn: 15 }
  );
};

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

//--------------- mot de passe---------------//
//envoie d'un email pour réinitialisation du mot de passe, payload l'email associé au compte
exports.sendEmailToResetPassword = (req, res) => {
  const email = req.body.email;

  db.query(`SELECT * FROM player WHERE email='${email}'`, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Une erreur avec le serveur s'est produite !" });
    }

    if (result.length > 0) {
      let resetToken = crypto.randomBytes(32).toString("hex");

      bcryptjs
        .hash(resetToken, Number(bcryptSalt))
        .then((hashedToken) => {
          // Enregistrement du token hashé dans la table player
          const playerId = result[0].id;
          db.query(
            `UPDATE player SET resetToken='${hashedToken}' WHERE id=${playerId}`,
            (updateErr) => {
              if (updateErr) {
                return res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du token de réinitialisation." });
              }

              const link = `${clientURL}/passwordReset/token=${resetToken}/id=${playerId}`;

              sendEmail(
                email,
                "Réinitialisation du mot de passe - L'équipe Click & Raquette",
                {
                  name: result[0].forename,
                  link: link,
                },
                "./email/template/emailToResetPassword.handlebars"
              );

              return res.status(201).json({
                userId: playerId,
                token: resetToken,
                message: "Un email de réinitialisation a été envoyé !",
              });
            }
          );
        })
        .catch((error) => {
          return res.status(500).json({ message: "Une erreur s'est produite lors du hachage du token." });
        });
    } else {
      res.status(404).json({
        message: "L'email est inconnu. Veuillez réessayer.",
      });
    }
  });
};
//enregistrement du nouveau mot de passe réinitialisé, payload fourni : le mot de passe, id et le token
exports.saveResetPassword = (req, res) => {
  console.log("req.body"+req.body)
  const userId = req.body.userId;
  console.log("userId"+req.body.userId)
  const resetToken = req.body.resetToken;
  const newPassword = req.body.newPassword;

  // Vérifier si l'utilisateur existe dans la base de données
  db.query(`SELECT * FROM player WHERE id='${userId}'`, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Une erreur avec le serveur s'est produite !" });
    }

    // Vérifier si l'utilisateur a le même resetToken que celui stocké dans la base de données
    const storedResetToken = result[0].resetToken;
    bcryptjs.compare(resetToken, storedResetToken, (compareErr, isMatch) => {
      if (compareErr) {
        return res.status(500).json({ message: "Une erreur de comparaison s'est produite." });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Le token de réinitialisation est invalide." });
      }

      // Hacher le nouveau mot de passe
      bcryptjs.hash(newPassword, Number(bcryptSalt))
        .then((hashedPassword) => {
          // Mettre à jour le mot de passe dans la base de données
          db.query(`UPDATE player SET password='${hashedPassword}', resetToken=NULL WHERE id='${userId}'`, (updateErr) => {
            if (updateErr) {
              return res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du mot de passe." });
            }

            return res.status(200).json({ message: "Le mot de passe a été réinitialisé avec succès." });
          });
        })
        .catch((hashErr) => {
          return res.status(500).json({ message: "Une erreur s'est produite lors du hachage du mot de passe." });
        });
    });
  });
};
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
// Fonction pour vérifier le mot de passe
const verifyPassword = (password, hashedPassword) => {
  return bcryptjs.compare(password, hashedPassword);
};




// fonction qui renvoit la liste des commandes effectué son historique
exports.sendOrderLog = (req, res, next) => {
  console.log("req.body", req.body);

  const email = req.body.email;

  db.query(
    `SELECT id FROM orders WHERE JSON_UNQUOTE(JSON_EXTRACT(userInfo, '$.email')) = ?`,
    [email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Une erreur s'est produite sur le serveur." });
      }

      const ordersId = result.map((row) => row.id);
      console.log("ordersId", ordersId);

      const ordersInfo = [];
      let count = 0;

      ordersId.forEach((orderId) => {
        db.query(`SELECT orderDate, statusOrder, id, totalPrice FROM orders WHERE id='${orderId}'`, (err, result) => {
          count++;

          if (err) {
            console.error(err);
          } else {
            ordersInfo.push(result[0]);
          }

          if (count === ordersId.length) {
            return res.status(201).json({
              data: {
                ordersInfo: ordersInfo
              },
              message: 'Données de commande récupérées avec succès!'
            });
          }
        });
      });
    }
  );
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




// Fonction qui vérifie si le token a été validé
exports.isTokenYeatOk = (req, res, next) => {
  try {
    // Une fois que toutes les vérifications sont terminées avec succès, vous pouvez renvoyer une réponse au frontend
    return res.status(200).json({
      message: 'Token encore valide',
    });
  } catch (error) {
    // Si une erreur se produit (par exemple, des vérifications supplémentaires échouent),
    // vous pouvez renvoyer une réponse d'erreur appropriée
    return res.status(401).json({
      error: 'Vérification du token échouée'
    });
  }
};










