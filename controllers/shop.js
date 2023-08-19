// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");
dotenv.config();


//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")

//module, configuration pour envoyer des sms 
const accountSid = process.env.ACCOUNT_SID
console.log("accountSise",accountSid)
const authToken = process.env.AUT_TOKEN 
console.log("autoken",authToken)
const client = require('twilio')(accountSid, authToken);

// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")





      //----------- ensemble des fonctions liées aux produits ---------------//


// retourne l'ensemble  des cordage de manière aléatoire
exports.productListRandom = (req, res ) => {

  console.log( "le payload fournit à productListRandom est" );   console.log( req.body ) ;
  // on récupère la categorie du produit (cordage, balles ...)
  const productCategorie = req.body.productCategorie;

  // on recherche la liste des marques dans la BDD
  db.query(`SELECT * FROM ${productCategorie} ORDER BY RAND()`, 
    (error, results) =>{
      if (error){          
        res.status(404).json({
        message: 'erreur avec la base ici depuis mise en ligne serveur de donnée'
      })
      }

      {
        const stringListRandom = results
        return res.status(201).json(results = {
        stringListRandom: stringListRandom,
        message: 'la liste aléatoire des cordages a été récupéré!'
        });
       }
    } 
  )

}


// retourne la liste des cordages en filtant sur la base des données
// via les paramètres fournit
exports.stringListFiltered = (req, res) => {
  console.log( "le payload fournit à productListFiltered  est" );   console.log( req.body ) ;

  // on récupère la categorie du produit (cordage, balles ...)
  const productCategorie = req.body.productCategorie;
  // on récupère les options de filtre sélectionnées dans le frontend
  const arrayOptions = req.body.categorieWithOptionSelectedForString;

  // on initialise une requête SQL pour récupérer la liste des cordages
  let query = `SELECT * FROM ${productCategorie} WHERE `;

  // on crée un tableau vide pour stocker les conditions de filtre
  const conditions = [];

  // on parcourt chaque option de filtre
  arrayOptions.forEach((option) => {
    const optionSelectedForOneCategorie = option.optionSelectedForOneCategorie;

    // on vérifie que le tableau de valeurs sélectionnées n'est pas vide
    if (optionSelectedForOneCategorie.length > 0) {
      // on remplace toutes les apostrophes par l'apostrophe échappée (\') pour chaque valeur sélectionnée
      const sanitizedoptionSelectedForOneCategorie = optionSelectedForOneCategorie.map((opt) => opt.replace(/'/g, "\\'"));

      // on crée une chaîne de caractères avec les valeurs sélectionnées, séparées par des virgules
      const optionSelectedForOneCategorieString = sanitizedoptionSelectedForOneCategorie.map((opt) => `'${opt}'`).join(",");

      // on ajoute la condition de filtre correspondante à la liste des conditions
      conditions.push(`${option.fieldNameBdd} IN (${optionSelectedForOneCategorieString})`);
    }
  });

  // on vérifie que la liste de conditions n'est pas vide
  if (conditions.length > 0) {
    // on ajoute les conditions de filtre à la requête SQL
    query += conditions.join(" AND ");

    // on exécute la requête SQL
    db.query(query, (err, results) => {
      if (err) {
        // si une erreur se produit, on la logge dans la console et on retourne une réponse avec un code d'erreur 500
        console.log(err);
        res.status(500).json({
          message: "Erreur lors de la recherche des produits",
        });
      } else {
        // si la liste des cordages est trouvée, on la retourne avec un code de succès 201
        if (results.length > 0) {
          return res.status(201).json({
            stringList: results,
            message: "La liste des produits filtrés a été récupérée !",
          });
        } else {
          // si aucune liste de cordages ne correspond aux filtres, on retourne un code d'erreur 404
          return res.status(201).json({
            stringList: [],
            message: "il n' y a pas de produits correspondant aux options choisis",
          });
        }
      }
    });
  } else {
    // si la liste de conditions est vide, on retourne un code d'erreur 400
    res.status(400).json({
      message: "Aucun filtre n'a été sélectionné !",
    });
  }
};


// retourne la liste des balles en filtant sur la base des données
// via les paramètres fournit
exports.ballListFiltered = (req, res) => {
  console.log( "le payload fournit à ballListFiltered  est" );   console.log( req.body ) ;

  // on récupère la categorie du produit (cordage, balles ...)
  const productCategorie = req.body.productCategorie;
  // on récupère les options de filtre sélectionnées dans le frontend
  const arrayOptions = req.body.categorieWithOptionSelectedForBall;
  console.log( "la liste des catégories avec options fournit à ballListFiltered  est" );   console.log( req.body.categorieWithOptionSelectedForBall ) ;

  // on initialise une requête SQL pour récupérer la liste des cordages
  let query = `SELECT * FROM ${productCategorie} WHERE `;

  // on crée un tableau vide pour stocker les conditions de filtre
  const conditions = [];

  // on parcourt chaque option de filtre
  arrayOptions.forEach((option) => {
    const optionSelectedForOneCategorie = option.optionSelectedForOneCategorie;

    // on vérifie que le tableau de valeurs sélectionnées n'est pas vide
    if (optionSelectedForOneCategorie.length > 0) {
      // on remplace toutes les apostrophes par l'apostrophe échappée (\') pour chaque valeur sélectionnée
      const sanitizedoptionSelectedForOneCategorie = optionSelectedForOneCategorie.map((opt) => opt.replace(/'/g, "\\'"));

      // on crée une chaîne de caractères avec les valeurs sélectionnées, séparées par des virgules
      const optionSelectedForOneCategorieString = sanitizedoptionSelectedForOneCategorie.map((opt) => `'${opt}'`).join(",");

      // on ajoute la condition de filtre correspondante à la liste des conditions
      conditions.push(`${option.fieldNameBdd} IN (${optionSelectedForOneCategorieString})`);
    }
  });

  // on vérifie que la liste de conditions n'est pas vide
  if (conditions.length > 0) {
    // on ajoute les conditions de filtre à la requête SQL
    query += conditions.join(" AND ");

    // on exécute la requête SQL
    db.query(query, (err, results) => {
      if (err) {
        // si une erreur se produit, on la logge dans la console et on retourne une réponse avec un code d'erreur 500
        console.log(err);
        res.status(500).json({
          message: "Erreur lors de la recherche des produits",
        });
      } else {
        // si la liste des cordages est trouvée, on la retourne avec un code de succès 201
        if (results.length > 0) {
          return res.status(201).json({
            stringList: results,
            message: "La liste des produits filtrés a été récupérée !",
          });
        } else {
          // si aucune liste de cordages ne correspond aux filtres, on retourne un code d'erreur 404
          return res.status(201).json({
            stringList: [],
            message: "il n' y a pas de produits correspondant aux options choisis",
          });
        }
      }
    });
  } else {
    // si la liste de conditions est vide, on retourne un code d'erreur 400
    res.status(400).json({
      message: "Aucun filtre n'a été sélectionné !",
    });
  }
};


// retourne la liste des balles en filtant sur la base des données
// via les paramètres fournit
exports.accessoriesListFiltered = (req, res) => {
  console.log( "le payload fournit à accessoriesListFiltered  est" );   console.log( req.body ) ;

  // on récupère la categorie du produit (cordage, balles ...)
  const productCategorie = req.body.productCategorie;
  // on récupère les options de filtre sélectionnées dans le frontend
  const arrayOptions = req.body.categorieWithOptionSelectedForAccessories;
  console.log( "la liste des catégories avec options fournit à accessoriesListFiltered  est" );   console.log( req.body.categorieWithOptionSelectedForBall ) ;

  // on initialise une requête SQL pour récupérer la liste des cordages
  let query = `SELECT * FROM ${productCategorie} WHERE `;

  // on crée un tableau vide pour stocker les conditions de filtre
  const conditions = [];

  // on parcourt chaque option de filtre
  arrayOptions.forEach((option) => {
    const optionSelectedForOneCategorie = option.optionSelectedForOneCategorie;

    // on vérifie que le tableau de valeurs sélectionnées n'est pas vide
    if (optionSelectedForOneCategorie.length > 0) {
      // on remplace toutes les apostrophes par l'apostrophe échappée (\') pour chaque valeur sélectionnée
      const sanitizedoptionSelectedForOneCategorie = optionSelectedForOneCategorie.map((opt) => opt.replace(/'/g, "\\'"));

      // on crée une chaîne de caractères avec les valeurs sélectionnées, séparées par des virgules
      const optionSelectedForOneCategorieString = sanitizedoptionSelectedForOneCategorie.map((opt) => `'${opt}'`).join(",");

      // on ajoute la condition de filtre correspondante à la liste des conditions
      conditions.push(`${option.fieldNameBdd} IN (${optionSelectedForOneCategorieString})`);
    }
  });

  // on vérifie que la liste de conditions n'est pas vide
  if (conditions.length > 0) {
    // on ajoute les conditions de filtre à la requête SQL
    query += conditions.join(" AND ");

    // on exécute la requête SQL
    db.query(query, (err, results) => {
      if (err) {
        // si une erreur se produit, on la logge dans la console et on retourne une réponse avec un code d'erreur 500
        console.log(err);
        res.status(500).json({
          message: "Erreur lors de la recherche des produits",
        });
      } else {
        // si la liste des cordages est trouvée, on la retourne avec un code de succès 201
        if (results.length > 0) {
          return res.status(201).json({
            stringList: results,
            message: "La liste des produits filtrés a été récupérée !",
          });
        } else {
          // si aucune liste de cordages ne correspond aux filtres, on retourne un code d'erreur 404
          return res.status(201).json({
            stringList: [],
            message: "il n' y a pas de produits correspondant aux options choisis",
          });
        }
      }
    });
  } else {
    // si la liste de conditions est vide, on retourne un code d'erreur 400
    res.status(400).json({
      message: "Aucun filtre n'a été sélectionné !",
    });
  }
};


// on récupère le produit sélectionné via le id et le nom du tableau
exports.productSelected = (req, res ) => {

  console.log( "le payload fournit à productSelected est" );   console.log( req.body ) ;
  // on récupère la categorie et l'd du produit 
  const productCategorie = req.body.productCategorie;
  const productId = req.body.productId

  // on recherche le produit dans la bdd
  db.query(`SELECT * FROM ${productCategorie} WHERE id = ${productId} `, 
    (error, results) =>{
      if (error){          
        res.status(404).json({
        message: 'erreur avec la base de donnée'
      })
      }

      {
        const productSelected = results
        return res.status(201).json(results = {
        productSelected: productSelected,
        message: 'le produit choisi a été récupéré!'
        });
       }
    } 
  )
}


// on recherche la liste des dépôts de collecte dans la BDD
exports.listHubCollect = (req, res) => {
  db.query(`SELECT * FROM hub WHERE collect = 1;`, 
    (error, results) => {
      if (error) {          
        res.status(500).json({
          message: 'Erreur avec la base de données'
        });
      } else {
        const listHubCollect = results;
        return res.status(200).json({
          listHubCollect: listHubCollect,
          message: 'La liste des dépôts de collecte a été récupérée!'
        });
      }
    } 
  );
}


// on recherche la liste des dépôts de retrait dans la BDD
exports.listHubWithdrawal = (req, res) => {
  db.query(`SELECT * FROM hub WHERE withdrawal = 1;`, 
    (error, results) => {
      if (error) {          
        res.status(500).json({
          message: 'Erreur avec la base de données'
        });
      } else {
        const listHubWithdrawal = results;
        return res.status(200).json({
          listHubWithdrawal: listHubWithdrawal,
          message: 'La liste des dépôts de retrait a été récupérée!'
        });
      }
    } 
  );
}


          //----------- ensemble des fonctions liées aux commandes ---------------//


                //logique pour enregistrement de la commande /

// fonction de sauvegarde de la commande dans la base de données
function saveOrderToDatabase(articleList, orderDate,  statusOrder, totalPriceProducts, userInfo, hub, hubBack) {
  return new Promise((resolve, reject) => {
    // Construisez la requête SQL pour insérer les données dans la table
    const query = 'INSERT INTO orders (articleList, orderDate, statusOrder, totalPrice, userInfo, hub, hubBack) VALUES ( ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [articleList, orderDate,  statusOrder, totalPriceProducts, userInfo, hub, hubBack], (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'enregistrement de la commande :', error);
        reject(error);
      } else {
        console.log('Commande enregistrée avec succès');
        resolve(results);
      }
    });
  });
}
// Fonction d'enregistrement de la commande  avec paiement en boutique 
exports.saveOrderAndPreferencePlayer = async (req, res) => {
  console.log("Je rentre dans le backend pour enregistrement de la commande");

  try {
    // On récupère les données du frontend depuis le corps de la requête
    const datas = req.body;
    console.log("datas", datas)
    // Données pour l'enregistrement de la commande
    const articleList = JSON.stringify(datas.articleList); // Convertir l'objet en chaîne JSON
    console.log("articleList", articleList)
    const orderDate = new Date();
    const statusOrder = "initié";
    const userInfo = JSON.stringify(datas.userInfo);
    console.log("userInfo", userInfo)
    const firstName = userInfo.firstName;
    const email = datas.userInfo.email;
    const hub = JSON.stringify(datas.hubChoice);
    const hubBack = JSON.stringify(datas.hubBackChoice);
    const totalPriceString = datas.totalPriceProducts;
    const totalPrice = Number(totalPriceString.replace(",", "."));
    const unitAmount = Math.round(totalPrice * 100);
    console.log("unitAmount " + unitAmount);
    const token = datas.token;
    console.log("token : " + token);

  


    // On enregistre les données dans la table `orders`
    const savedOrder = await saveOrderToDatabase(articleList, orderDate,  statusOrder, totalPrice, userInfo, hub, hubBack);
    // Récupérer l'ID généré à partir de `insertId`
    const idOrder = savedOrder.insertId;

    // envoie d'email au client
    try {
      await sendEmail(email, 'Confirmation de commande', {
        customerName: firstName,
      }, 'email/template/confirmationOrderEmail.handlebars');

      console.log('E-mail de confirmation  envoyé avec succès à', email);
    } catch (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
      // Vous pouvez choisir comment gérer l'erreur, par exemple, renvoyer une réponse d'erreur appropriée au client.
      return res.sendStatus(500);
    }
    // envoie d'email au cordeur
    const emailStringer = "herbreteauaurelien@tutanota.com"
    try {
      await sendEmail(emailStringer, 'nouvelle commande', {
        hub: hub,
        idOrder : idOrder, 
      }, 'email/template/newOrderEmail.handlebars');

      console.log('E-mail de nouvelle commande envoyé avec succès à', emailStringer);
    } catch (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail de nouvelle commande:', error);
      return res.sendStatus(500);
    }

    // Si tout s'est bien passé, renvoyer un message de succès
    res.status(200).json({ message: 'Commande enregistrée avec succès', orderId: idOrder });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la commande' });
  }
};




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
  console.log("cleanPhoneNumber", cleanedPhoneNumber)

  // Ajouter le préfixe international
  const formattedPhoneNumber = `'+33${cleanedPhoneNumber.substr(1)}'`;
  console.log("formattedPhoneNumber", formattedPhoneNumber)
    const message = await client.messages.create({
      body: `Bonjour ${forename}, votre commande est prête à être retiré ....`,
      from: '+18159499877',
      to: formattedPhoneNumber // Ajoutez les guillemets autour de ${formattedPhoneNumber}      
      //to: '+33616859867'
    });
    
    console.log('SMS envoyé. SID: ', message.sid);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS: ', error);
    throw error;
  }
}
       

// Fonction d'envoi d'email suite à la validation d'étapes
// Payload -> orderId, statusOrder, changeStatusDate, forename, email
async function sendEmailAfterStatusModify(orderId, statusOrder, changeStatusDate, forename, email) {
  return new Promise(async (resolve, reject) => {
    // Convertir la date au format français
    const changeStatusDate2 = new Date(changeStatusDate);
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const dateFrancaise = changeStatusDate2.toLocaleDateString('fr-FR', options);

    console.log("Date de changement de statut :", changeStatusDate);
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
        console.log('E-mail de confirmation de récupération raquette envoyé avec succès à', email);
        resolve();
      } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        reject(error);
      }
    } else if (statusOrder === "prête") {
      // Logique pour le statut "prête" (peut-être envoyer une facture)
      // À implémenter si nécessaire
    } else {
      console.log("Statut non pris en charge :", statusOrder);
      reject("Statut non pris en charge");
    }
  });
}
// fonction de recuperation de l'id du joueur à partir d'une commande, 
// payload -> orderId
async function takeInfosFromOrders(orderId) {
  console.log("lorderId", orderId);
  const query = 'SELECT * FROM orders  WHERE id = ?';

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [orderId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la récupération des données dans takeInfosFromOrdersToSendEmails  :', error);
          reject(error);
          return;
        } else {
          console.log("récupération des infos pour envoie d'email validé", results);
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
      phoneNumber: phoneNumber
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
// fonction pour modifier le status de la commande et envoyer l'email approprié
// payload -> orderID, statusOrder
exports.changeStatusOrder = async (req, res) => {
  console.log("Je rentre dans le backend pour changer le status de la commande");
  try {
    // On récupère les données du frontend depuis le corps de la requête
    const datas = req.body;
    console.log("datas", datas);
    const orderId= datas.orderId; 
    console.log("orderId", orderId);
    const statusOrder= datas.statusOrder; 
    console.log("statusorder", statusOrder);
    const changeStatusDate = new Date();

    // On modifie la table orders en changeant le status 
    await modifyOrdersToChangeStatus(orderId, statusOrder, changeStatusDate );
    // On récupère les infos 
    const userInfo = await takeInfosFromOrders(orderId);
    const forename = userInfo.forename;
    console.log("forename recupéré", forename);
    const email = userInfo.email;
    console.log("email recupéré", email);
    const phoneNumber = userInfo.phoneNumber;
    const userId = userInfo.userId;
    console.log("userId recupéré", userId);
    const user = await getUserById(userId);
    console.log("user", user)

    await sendEmailAfterStatusModify(orderId, statusOrder, changeStatusDate, forename, email)

    if (statusOrder === "prêt à corder") { 
    await sendSms( forename, phoneNumber )}

    
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
// Fonction pour récupérer l'adresse de l'utilisateur s'il est renseigné
const getUserAddress = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM address WHERE inHabitant='${userId}'`, (err, addressResult) => {
      if (err) {
        reject(err);
      } else {
        console.log("adressResult", addressResult)
        resolve(addressResult.length > 0 ? addressResult[0] : null);
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



    // Supprimer le mot de passe de l'objet utilisateur avant de le renvoyer
    //delete user.user.password_hash;

    // On essaie de retrouver l'adresse du joueur s'il est renseigné
    const userAddress = await getUserAddress(userId);
    console.log("usserAdress",userAddress)
    // Retourner les données et le message
    return res.status(201).json({
      userInfo: user.user,
      userAddress: userAddress,
      message: 'récupération des données joueurs réussies !',
    });
  } catch (err) {
    // En cas d'erreur, renvoyer une erreur 500
    return res.status(500).json({ message: 'Une erreur est survenue lors de la recuperation des données.' });
  }
};







 


















