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
const app = require('../app');


//---------------------compte joueur, préférences, info joueurs-----------------------//


//---------------sous-fonctions utilisées ailleurs---------------//
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

const verifyPassword = (password, hashedPassword) => {
  return bcryptjs.compare(password, hashedPassword);
};


// fonction de creation d'un compte joueur   
exports.signup = (req, res) => {
  db.query('SELECT * FROM player WHERE email = ?', [req.body.email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Une erreur est survenue lors de la vérification de l\'email.' });
    }

    if (results.length > 0) {
      return res.status(422).json({ message: 'Email non disponible l\'ami ! ' });
    } else {
      try {
        const cryptedPassword = await bcryptjs.hash(req.body.password, Number(bcryptSalt));

        db.query('INSERT INTO player (lastname, forename, email, password_hash, telephone) VALUES (?, ?, ?, ?, ?)', [req.body.lastname, req.body.forename, req.body.email, cryptedPassword, req.body.telephone], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Une erreur est survenue lors de l\'insertion des données.' });
          }

          db.query('SELECT * FROM player WHERE email = ?', [req.body.email], (err, result) => {
            if (err) {
              return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des données.' });
            }

            const userId = result[0].id;
            const xsrfToken = crypto.randomBytes(64).toString('hex');
            const token = jwt.sign({ userId: userId, xsrfToken }, Token_Secret_Key, { expiresIn: '3d' });

            delete result[0].password_hash;

            res.cookie('token', token, {
              httpOnly: true, // empeche l'acces au cookie depuis le js
              secure: true, // cookie accessible uniquement en https !
              sameSite: 'none', // cookie accessible depuis un autre domaine
              maxAge: 3 * 24 * 60 * 60 * 1000 // 3 jours
            });

            //on retourne des datas et le message
            return res.status(201).json({
              userInfo: result[0],
              xsrfToken: xsrfToken, // Ajouter le xsrfToken à la réponse
              tokenExpiresIn: 3 * 24 * 60 * 60 * 1000, // Ajouter le temps d'expiration du token à la réponse
              message: 'Votre compte a bien été crée !'
            });
          });
        });
      } catch (err) {
        return res.status(500).json({ message: 'Une erreur est survenue lors du hachage du mot de passe.' });
      }
    }
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



    // Mot de passe correct
    const userId = user.userInfos.id;

    /* On créer le token CSRF  */
    const xsrfToken = crypto.randomBytes(64).toString('hex');
    
    // On créer le token JWT, et on inclue le xsrfToken dans le payload pour pouvoir le recuperer ensuite et le comparer
    const token = jwt.sign(
      {  userId: userId, xsrfToken },
      Token_Secret_Key,
      { expiresIn: '3d' }
    );

    // Définir le cookie pour le JWT
    res.cookie('token', token, {
      httpOnly: true, // empeche l'acces au cookie depuis le js
      secure: true, // cookie accessible uniquement en https !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      sameSite: 'none', // cookie accessible depuis un autre domaine
      maxAge: 3 * 24 * 60 * 60 * 1000
    });



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
      xsrfToken: xsrfToken, // Ajouter le xsrfToken à la réponse
      tokenExpiresIn: 3 * 24 * 60 * 60 * 1000,// Ajouter le temps d'expiration du token à la réponse
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
db.query(`UPDATE player SET telephone = ?, road = ?, city = ?, postal_code = ? WHERE id = ?`, 
[req.body.telephone, req.body.road, req.body.city, req.body.postalCode, req.body.playerId],
(err) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des données." });
  }

  // Après la mise à jour, sélectionnez à nouveau les données mises à jour du joueur
  db.query(`SELECT * FROM player WHERE id = ?`, [req.body.playerId],
  (selectErr, result) => {
    if (selectErr) {
      console.error(selectErr);
      return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des données mises à jour." });
    }
    
    // Envoyer les données mises à jour en réponse
    const updatedPlayerData = result[0];
    res.status(200).json({ message: "Mise à jour réussie.", updatedPlayerData });
  });
});
};

// fonction qui enregistre les préférences du joueur 
exports.savePreferencePlayer = (req, res) => {
  const { userId, stringFromPlayer, stringFromShopId, stringRopeChoice, hubChoiceId, hubBackChoiceId, racquetPlayer, numberKnotChoice } = req.body;

  const stringFromPlayerValue = stringFromPlayer !== "null" ? stringFromPlayer : null;
  const stringFromShopIdValue = stringFromShopId !== "null" ? stringFromShopId : null;

  const updateQuery = `
    UPDATE player 
    SET stringFromShop_id = ?, string_rope = ?, hub_id = ?, hubBack_id = ?, racquet_player = ?, stringFromPlayer = ?, numberKnotChoice = ?
    WHERE id = ?
  `;

  const updateValues = [
    stringFromShopIdValue,
    stringRopeChoice,
    hubChoiceId,
    hubBackChoiceId,
    racquetPlayer,
    stringFromPlayerValue,
    numberKnotChoice,
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


// Fonction qui recupère les données joueurs ave un email fournies comme payload
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

// fonction qui envoie un mail pour réinitialiser le mot de passe
exports.sendEmailToResetPassword = (req, res) => {
  // Récupération de l'email à partir de la requête
  const email = req.body.email;

  // Requête à la base de données pour trouver le joueur avec cet email
  db.query('SELECT * FROM player WHERE email = ?', [email], (err, result) => {
    // Si une erreur se produit, renvoie une réponse avec le statut 500 et un message d'erreur
    if (err) {
      return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." });
    }

    // Si un joueur est trouvé
    if (result.length > 0) {
      // Génère un token de réinitialisation
      let resetToken = crypto.randomBytes(32).toString("hex");

      // Calcule la date d'expiration du token (ici, dans une heure)
      let expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      // Hache le token de réinitialisation avant de le stocker
      bcryptjs.hash(resetToken, Number(bcryptSalt))
        .then((hashedToken) => {
          // Récupère l'ID du joueur
          const playerId = result[0].id;

          // Met à jour le token de réinitialisation et la date d'expiration du joueur dans la base de données
          db.query(
            'UPDATE player SET resetToken = ?, resetTokenExpiry = ? WHERE id = ?', [hashedToken, expiryDate, playerId],
            (updateErr) => {
              // Si une erreur se produit, renvoie une réponse avec le statut 500 et un message d'erreur
              if (updateErr) {
                return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." });
              }

              // Crée le lien pour la réinitialisation du mot de passe
              const link = `${clientURL}/passwordReset/token=${resetToken}/id=${playerId}`;

              // Envoie l'email de réinitialisation du mot de passe
              sendEmail(
                email,
                "Réinitialisation du mot de passe - L'équipe Click & Raquette",
                {
                  name: result[0].forename,
                  link: link,
                },
                "./email/template/emailToResetPassword.handlebars"
              );

              // Renvoie une réponse avec le statut 201, l'ID de l'utilisateur, le token et un message de succès
              return res.status(201).json({
                message: "Un email de réinitialisation a été envoyé !",
              });
            }
          );
        })
        .catch((error) => {
          // Si une erreur se produit lors du hachage du token, renvoie une réponse avec le statut 500 et un message d'erreur
          return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." });
        });
    } else {
      // Si aucun joueur n'est trouvé, renvoie une réponse avec le statut 404 et un message d'erreur
      res.status(404).json({
        message: "L'email est inconnu. Veuillez réessayer.",
      });
    }
  }) 
}


// Fonction pour enregistrer le nouveau mot de passe réinitialisé
exports.saveResetPassword = (req, res) => {
  // Récupération des données à partir de la requête
  const userId = req.body.userId;
  const resetToken = req.body.resetToken;
  const newPassword = req.body.newPassword;

  // Requête à la base de données pour trouver l'utilisateur avec cet ID
  db.query('SELECT * FROM player WHERE id = ?', [userId], (err, result) => {
    // Si une erreur se produit, renvoie une réponse avec le statut 500
    if (err) {
      return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." });
    }

    // Récupère le token de réinitialisation haché stocké dans la base de données
    const storedResetToken = result[0].resetToken;

    // Vérifie si le token a expiré 
    const now = new Date();
    const resetTokenExpiry = new Date(result[0].resetTokenExpiry);

    if (now > resetTokenExpiry) {
      return res.status(400).json({ message: "Le token a expiré. Veuillez demander un nouveau lien de réinitialisation." });
    }

// Compare le token de réinitialisation fourni avec le token haché stocké dans la base de données
  bcryptjs.compare(resetToken, storedResetToken, (compareErr, isMatch) => {
    // Si une erreur se produit lors de la comparaison, renvoie une réponse avec le statut 500
    if (compareErr) {
      return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." });
    }

    // Si les tokens ne correspondent pas, renvoie une réponse avec le statut 400
    if (!isMatch) {
      return res.status(400).json({ message: "Le token de réinitialisation est invalide." });
    }

    // Hache le nouveau mot de passe
    bcryptjs.hash(newPassword, Number(bcryptSalt))
      .then((hashedPassword) => {
        // Met à jour le mot de passe dans la base de données
        db.query('UPDATE player SET password_hash = ?, resetToken = NULL WHERE id = ?', [hashedPassword, userId], (updateErr) => {
          // Si une erreur se produit lors de la mise à jour, renvoie une réponse avec le statut 500
          if (updateErr) {
            return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." });
          }

          // Renvoie une réponse avec le statut 200 indiquant que le mot de passe a été réinitialisé avec succès
          return res.status(200).json({ message: "Le mot de passe a été réinitialisé avec succès." });
        });
      })
      .catch((hashErr) => {
        // Si une erreur se produit lors du hachage du mot de passe, renvoie une réponse avec le statut 500
        return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." });
      });
  });
  });
};



//--------------- commandes ---------------//

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

      const ordersInfo = [];
      let count = 0;
      let noOrdersFound = true; // Variable pour vérifier si des données ont été trouvées

      ordersId.forEach((orderId) => {
        db.query(`SELECT orderDate, statusOrder, id, totalPrice FROM orders WHERE id='${orderId}'`, (err, result) => {
          count++;

          if (err) {
            console.error(err);
          } else {
            if (result.length > 0) {
              // Des données ont été trouvées
              noOrdersFound = false;
              ordersInfo.push(result[0]);
            }

            if (count === ordersId.length) {
              if (noOrdersFound) {
                // Aucune commande trouvée, renvoie un message approprié
                return res.status(201).json({
                  message: "Vous n'avez pas encore effectué de commande."
                });
              } else {
                return res.status(201).json({
                  data: {
                    ordersInfo: ordersInfo
                  },
                  message: 'Données de commande récupérées avec succès!'
                });
              }
            }
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














