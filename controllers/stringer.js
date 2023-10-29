// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");   
dotenv.config();

// Chargez les informations de Twilio depuis votre fichier .env
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUT_TOKEN;

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

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






                //----------- renvoit des commandes depuis table orders ---------------//


// fonction filtre qui renvoit la liste des commandes en fonction du status
// payload -> statusOrder
exports.ordertSelectedByStatus = (req, res, next) => {
  const datas = req.body;
  console.log("datas", datas);
  const statusOrder= datas.statusOrder;
  console.log("statusOrder", statusOrder); 
  const statusToRetrieve = statusOrder;
  const sqlQuery = `
    SELECT id, hub, articleList
    FROM orders
    WHERE statusOrder = '${statusToRetrieve}';
  `;

  db.query(sqlQuery, (err, queryResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erreur lors de la récupération des données.'
      });
    }
  
    const orderListFiltered = [];
    for (const result of queryResults) {
      const hubObject = JSON.parse(result.hub);
      const articleList = JSON.parse(result.articleList);
      const racquetPlayerList = []; 
      for (const article of articleList) {
        if (article.racquetPlayer) {
          racquetPlayerList.push(article.racquetPlayer);
        }
      }
      orderListFiltered.push({
        id: result.id,
        hub: hubObject.enterprise_name, 
        racquetPlayerList: racquetPlayerList
      });
    }
    
    res.status(200).json({
      message: "List of racquets to string retrieved successfully",
      orderListFiltered : orderListFiltered 
    });
  });
}

// fonction qui renvoit une commande précise
// payload -> orderId
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


            //----------- validation des différents etapes, chgment status et envoie email ---------------//


// Fonction pour envoyer un SMS

async function sendSms(forename, phoneNumber) {
  try {
    // Supprimer les espaces et les caractères non numériques du numéro
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Vérifier le format du numéro de téléphone (06 ou 07) et ajouter le préfixe international
    let formattedPhoneNumber;
    if (cleanedPhoneNumber.startsWith("06")) {
      formattedPhoneNumber = `+336${cleanedPhoneNumber.substr(2)}`;
    } else if (cleanedPhoneNumber.startsWith("07")) {
      formattedPhoneNumber = `+337${cleanedPhoneNumber.substr(2)}`;
    } else {
      throw new Error("Format de numéro de téléphone non pris en charge");
    }

    const message = await client.messages.create({
      body: `Bonjour ${forename}, votre raquette est magnifiquement cordée et prête à être retirée à la boutique ! Hervé Karren`,
      from: '+18159499877',
      to: formattedPhoneNumber
    });

    console.log('SMS envoyé. SID :', message.sid);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS :', error);
    throw error;
  }
}



// Fonction d'envoi d'email suite à la validation d'étapes, Payload -> orderId, statusOrder, changeStatusDate, forename, email
async function sendEmailAfterStatusModify(orderId, statusOrder, changeStatusDate, forename, email) {
  return new Promise(async (resolve, reject) => {
    // Convertir la date au format français
    const changeStatusDate2 = new Date(changeStatusDate);
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const dateFrancaise = changeStatusDate2.toLocaleDateString('fr-FR', options);


    console.log("Date de changement de statut :", dateFrancaise);
    console.log("OrderId :", orderId);
    console.log("StatusOrder :", statusOrder);

    // Gérer différents statuts de commande, le status dans la variable correspond à l'ancien statut, à l'étape précédent celle surlaquelle on va après la fin du code ...
    if (statusOrder === "initié") {
      try {
        // Envoyer l'e-mail de confirmation de récupération raquette
        await sendEmail(email, 'Confirmation de collecte de votre raquette', {
          customerName: forename, date: dateFrancaise, orderId: orderId
        }, 'email/template/confirmationColectEmail.handlebars');
        console.log('E-mail de confirmation de récupération raquette envoyé avec succès à', email);
        resolve();
      } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        reject(error);
      }
    } else if (statusOrder === "prêt à corder") {
      try {
        // Envoyer l'e-mail de confirmation de commande prête 
        await sendEmail(email, 'Votre commande est disponible', {
          customerName: forename, orderId: orderId
        }, 'email/template/orderReadyEmail.handlebars');
        console.log('E-mail de confirmation de commande prête envoyé avec succès à', email);
        resolve();
      } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        reject(error);
      }
    } else if (statusOrder === "prête") {
      console.log("en attente d'envoie de facture")
      resolve();

    } else {
      console.log("Statut non pris en charge :", statusOrder);
      reject("Statut non pris en charge");
    }
  });
}
// fonction de recuperation de l'id du joueur à partir d'une commande,  payload -> orderId
async function takeInfosFromOrders(orderId) {
  const query = 'SELECT * FROM orders  WHERE id = ?';
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [orderId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la récupération des données dans takeInfosFromOrdersToSendEmails  :', error);
          reject(error);
          return;
        } else {
          console.log("récupération des infos pour envoie d'email validé");
          resolve(results);
        }
      });
    });
    const userInfoString = results[0].userInfo; // Obtenez la chaîne JSON
    const userInfoObject = JSON.parse(userInfoString); // Analysez la chaîne JSON en un objet
    const forename = userInfoObject.forename;
    console.log("forename", forename);
    const email = userInfoObject.email; 
    console.log("email", email);
    const phoneNumber = userInfoObject.telephone; 
    console.log("phonenumber", phoneNumber);
    const userId = userInfoObject.id; 
    console.log("userId", userId);
    return {
      userId: userId,
      forename: forename,
      email: email,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// Fonction de modification de status 
function modifyOrdersToChangeStatus(orderId, statusOrder, changeStatusDate,) {
  return new Promise((resolve, reject) => {
    console.log("Date de changement de statut :", changeStatusDate);
    console.log("OrderId :", orderId);
    console.log("StatusOrder :", statusOrder);

    if (statusOrder === "initié") {
      // Construire la requête SQL pour mettre à jour les données dans la table
      const query = 'UPDATE orders SET statusOrder = ?, racquetTakenDate = ? WHERE id = ?';
      const statusToUpdate = 'prêt à corder';
      db.query(query, [statusToUpdate, changeStatusDate, orderId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour de la commande :', error);
          reject(error);
          return;
        } else {
          console.log("Statut et date mis à jour avec succès pour la commande", orderId);
          resolve(results);
        }
      });
    } else if (statusOrder === "prêt à corder") {
      // Construire la requête SQL pour mettre à jour les données dans la table
      const query = 'UPDATE orders SET statusOrder = ?, orderReadyDate = ? WHERE id = ?';
      const statusToUpdate = 'prête';
      db.query(query, [statusToUpdate, changeStatusDate, orderId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour de la commande :', error);
          reject(error);
          return;
        } else {
          console.log("Statut et date mis à jour avec succès pour la commande", orderId);
          resolve(results);
        }
      });
    } else if (statusOrder === "prête") {
      // Construire la requête SQL pour mettre à jour les données dans la table
      const query = 'UPDATE orders SET statusOrder = ?, orderValidateDate= ? WHERE id = ?';
      const statusToUpdate = 'commande validée';
      db.query(query, [statusToUpdate, changeStatusDate, orderId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour de la commande :', error);
          reject(error);
          return;
        } else {
          console.log("Statut et date mis à jour avec succès pour la commande", orderId);
          resolve(results);
        }
      });
    } else {
      console.log("Statut non pris en charge :", statusOrder);
      reject("Statut non pris en charge");
    }
  });
}

// fonction pour modifier le status de la commande, envoyer l'email approprié, le sms si numéro de telephone payload -> orderID, statusOrder
exports.changeStatusOrder = async (req, res) => {
  console.log("Je rentre dans le backend pour changer le status de la commande");
  try {
    // On récupère les données du frontend depuis le corps de la requête
    const datas = req.body;
    const orderId= datas.orderId; 
    const statusOrder= datas.statusOrder; 
    const changeStatusDate = new Date();
    // On récupère l'id utilisateur depuis orders
    const userIdFromOrders = await takeInfosFromOrders(orderId);
    const userId = userIdFromOrders.userId;
    // On récupère des infos utilisateurs depuis la table player
    const userInfoFromUser = await getUserById(userId);
    const phoneNumber = userInfoFromUser.user.telephone;
    const forename = userInfoFromUser.user.forename;
    const email = userInfoFromUser.user.email;

    console.log("avant le changement de status");

    // On modifie la table orders en changeant le status 
    await modifyOrdersToChangeStatus(orderId, statusOrder, changeStatusDate );
    console.log("avant le changement d'email");
    await sendEmailAfterStatusModify(orderId, statusOrder, changeStatusDate, forename, email);

    if (statusOrder === "prêt à corder" && phoneNumber !== null && phoneNumber !== undefined) {
      await sendSms(forename, phoneNumber);
    }

    res.status(200).json({ message: 'la modification de status de la commande et l\'envoie d\'email sont effectives '});

  } catch (error) {
    console.error('Erreur lors de la modification de status de la commande et ou l\'envoie d\'email ', error);
    res.status(500).json({ error: 'Erreur lors de la modification de status de la commande et ou l\'envoie d\'email' });
  }
}



              //----------- renvoit de la fiche joueur  ---------------//

              
// Fonction pour récupérer l'utilisateur à partir de l'id
const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
  db.query(`SELECT * FROM player WHERE id='${userId}'`, (err, playerResult) => {

      if (err) {
        reject(err);
      } else {
        if (playerResult.length > 0) {
          console.log("playerResult", playerResult)
          resolve({ userType: 'player', user: playerResult[0] });
        } else {
          db.query(`SELECT * FROM hub WHERE id='${userId}'`, (err, hubResult) => {
            if (err) {
              reject(err);
            } else {
              if (hubResult.length > 0) {
                resolve({ userType: 'hub', user: hubResult[0] });
              } else {
                db.query(`SELECT * FROM stringer WHERE id='${userId}'`, (err, stringerResult) => {
                  if (err) {
                    reject(err);
                  } else {
                    if (stringerResult.length > 0) {
                      resolve({ userType: 'stringer', user: stringerResult[0] });
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
// Fonction de récupération des infos du joueur pour construire la fiche joueur
exports.sendOnePlayer = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    // On essaie de récupérer l'utilisateur dans les tables player, hub et stringer
    const user = await getUserById(userId);
    console.log("user", user)
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
      return res.status(404).json({ message: 'L\'utilisateur n\'a pas été trouvé!' });
    }

    // Retourner les données et le message
    return res.status(201).json({
      userInfo: user.user,
      message: 'récupération des données joueurs réussies !',
    });
  } catch (err) {
    // En cas d'erreur, renvoyer une erreur 500
    return res.status(500).json({ message: 'Une erreur est survenue lors de la recuperation des données.' });
  }
};
























