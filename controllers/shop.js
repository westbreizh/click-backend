// charge les variables d'environnement du fichier .env dans process.env
const dotenv = require("dotenv");
dotenv.config();
//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")
//module, configuration pour envoyer des sms 
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUT_TOKEN 
const client = require('twilio')(accountSid, authToken);
// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")



      //----------- ensemble des fonctions liées aux produits ---------------//


// retourne l'ensemble  des produits de manière aléatoire pour une catégorie une table donnée
exports.productListRandom = (req, res ) => {

  console.log( "le payload fournit à productListRandom est", req.body );  
  // on récupère la categorie du produit (cordage, balles ...)
  const productCategorie = req.body.productCategorie;

  // on recherche la liste complète des produit dans la bonne table (productCategorie)
  db.query(`SELECT * FROM ${productCategorie} ORDER BY RAND()`, 
    (error, results) =>{
      if (error){          
        res.status(404).json({
        message: 'erreur avec la base ici depuis mise en ligne serveur de donnée'
      })
      }

      {
        const productListRandom = results
        return res.status(201).json(results = {
        productListRandom: productListRandom,
        message: 'la liste aléatoire des produits pour une categorie a été récupéré!'
        });
       }
    } 
  )
}

// on récupère le produit sélectionné via le id et le nom du tableau du produit catégorie fournit en payload
exports.productSelected = (req, res ) => {

  console.log( "le payload fournit à productSelected est" , req.body);    
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
        const listHubCollect = results.map(result => {
          const { password_hash, ...rest } = result;
          return rest;
        });
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
        const listHubWithdrawal = results.map(result => {
          const { password_hash, ...rest } = result;
          return rest;
        });
        return res.status(200).json({
          listHubWithdrawal: listHubWithdrawal,
          message: 'La liste des dépôts de retrait a été récupérée!'
        });
      }
    } 
  );
}



                //logique pour enregistrement de la commande depuis la boutique, sans stripe //

//function d'enregistrement de la commande dans la base de données
function saveOrderToDatabase(articleList, orderDate,  statusOrder, totalPrice, userInfo, hub, hubBack) {
  return new Promise((resolve, reject) => {
    // Construisez la requête SQL pour insérer les données dans la table
    const query = 'INSERT INTO orders (articleList, orderDate, statusOrder, totalPrice, userInfo, hub, hubBack) VALUES ( ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [articleList, orderDate,  statusOrder, totalPrice, userInfo, hub, hubBack], (error, results) => {
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

// Fonction d'enregistrement de la commande et d'envoie d'email 
exports.saveOrderPaiementInShop = async (req, res) => {
  console.log("Je rentre dans le backend pour enregistrement de la commande");

  try {
    // On récupère les données du frontend depuis le corps de la requête
    const datas = req.body;
    console.log("datas", datas)

    // Données pour l'enregistrement de la commande
    const articleList = JSON.stringify(datas.articleList); // Convertir l'objet en chaîne JSON
    console.log("articleList", articleList)
    const orderDate = new Date();
    const userInfo = JSON.stringify(datas.userInfo);
    const firstName = userInfo.firstName;
    const email = datas.userInfo.email;
    const hub = JSON.stringify(datas.hubChoice);
    const hubBack = JSON.stringify(datas.hubBackChoice);
    const totalPriceString = datas.totalPrice;
    const totalPrice = Number(totalPriceString.replace(",", "."));
    const unitAmount = Math.round(totalPrice * 100);

    let statusOrder = "initié"; // Initialisez la variable ici

    if (datas.hubChoice.enterprise_name == "click-and-raquette") {
      statusOrder = "prêt à corder"; // Modifiez la valeur ici si la condition est vraie
    }

    console.log("statusOrder " + statusOrder);
    console.log("hub " + hub);
    console.log("datas.hubChoice.enterprise_name " + datas.hubChoice.enterprise_name);
    


    // On enregistre les données dans la table `orders`
    const savedOrder = await saveOrderToDatabase(articleList, orderDate,  statusOrder, totalPrice, userInfo, hub, hubBack);
    // Récupérer l'ID généré à partir de `insertId`
    const idOrder = savedOrder.insertId;

    // envoie d'email au client
    try {
      await sendEmail(email, 'Confirmation de commande', {
        customerName: firstName,
        idOrder : idOrder, 
      }, 'email/template/confirmationOrderEmail.handlebars');

      console.log('E-mail de confirmation  envoyé avec succès à', email);
    } catch (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
      // Vous pouvez choisir comment gérer l'erreur, par exemple, renvoyer une réponse d'erreur appropriée au client.
      return res.sendStatus(500);
    }
    // Attendre une courte pause (par exemple, 1 seconde)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Envoi d'e-mail au transporteur
    const emailTransporteur = "clickandraquette@gmail.com";
    try {
      await sendEmail(emailTransporteur, 'Nouvelle commande', {
        idOrder: idOrder,
      }, 'email/template/newOrderForStringer.handlebars');
      console.log('E-mail de nouvelle commande envoyé avec succès à', emailTransporteur);
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











 


















