//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")

// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")


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



//logique pour enregistrement de la commande et preferences joueur

// fonction de modification des preferences joueurs dans la table payer
function savePreferencePlayerToDatabase( hub, hubBack, stringId, stringRope, racquetPlayer, email) {
  return new Promise((resolve, reject) => {
    console.log("stringId"+ stringId)
    console.log("stringRope"+ stringRope)
    console.log("raqueete joeuer"+ racquetPlayer)
    // Construisez la requête SQL pour modifier les données dans la table player
    const query = 'UPDATE player SET hub = ?, hubBack = ?, string_id = ?, string_rope = ?, racquet_player = ?  WHERE email = ?';

    // Exécutez la requête SQL en utilisant le module mysql2
    db.query(query, [hub, hubBack, stringId, stringRope, racquetPlayer, email], (error, results) => {
      if (error) {
        console.error('Erreur lors de la modification des préférences joueur :', error);
        reject(error);
      } else {
        console.log('Préférences joueur modifiées avec succès');
        resolve(results);
      }
    });
  });
}


// fonction de sauvegarde de la commande dans la base de données
function saveOrderToDatabase(articleList, orderDate, serviceBackDate, statusOrder, totalPriceProducts, userInfo, hub, hubBack) {
  return new Promise((resolve, reject) => {
    // Construisez la requête SQL pour insérer les données dans la table
    const query = 'INSERT INTO orders (articleList, orderDate, serviceBackDate, statusOrder, totalPrice, userInfo, hub, hubBack) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [articleList, orderDate, serviceBackDate, statusOrder, totalPriceProducts, userInfo, hub, hubBack], (error, results) => {
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


// Fonction d'enregistrement des données dans la table `orders` et la table player suite à la commande avec règlement en magazin
exports.saveOrderAndPreferencePlayer = async (req, res) => {
  console.log("Je rentre dans le backend pour enregistrement de la commande");

  try {
    // On récupère les données du frontend depuis le corps de la requête
    const datas = req.body;

    // Données pour l'enregistrement de la commande
    const articleList = JSON.stringify(datas.articleList); // Convertir l'objet en chaîne JSON
    const orderDate = new Date();
    const serviceBackDate = new Date();
    const statusOrder = "initié";
    const userInfo = JSON.stringify(datas.userInfo);
    const hub = JSON.stringify(datas.hubChoice);
    const hubBack = JSON.stringify(datas.hubBackChoice);
    const totalPriceString = datas.totalPriceProducts;
    const totalPrice = Number(totalPriceString.replace(",", "."));
    const unitAmount = Math.round(totalPrice * 100);
    console.log("unitAmount " + unitAmount);
    const token = datas.token;
    console.log("token : " + token);

    // Variables pour la récupération des préférences du joueur
    let stringId = null;
    let stringRope = null;
    let racquetPlayer = JSON.stringify(datas.racquetPlayer);

    const buyList = datas.articleList;

    for (const item of buyList) {
      if (item.stringRopeChoice) {
        stringRope = item.stringRopeChoice;
        break;
      }
    }

    for (const item of buyList) {
      if (item.stringChoice && item.stringChoice.id) {
        stringId = item.stringChoice.id;
        break;
      }
    }

    const email = datas.userInfo.email;

    // On enregistre les données dans la table `player`
    await savePreferencePlayerToDatabase(hub, hubBack, stringId, stringRope, racquetPlayer, email);

    // On enregistre les données dans la table `orders`
    const savedOrder = await saveOrderToDatabase(articleList, orderDate, serviceBackDate, statusOrder, totalPrice, userInfo, hub, hubBack);
    // Récupérer l'ID généré à partir de `insertId`
    const idOrder = savedOrder.insertId;

    // Si tout s'est bien passé, renvoyer un message de succès
    res.status(200).json({ message: 'Commande enregistrée avec succès', orderId: idOrder });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la commande' });
  }
};



eexports.racquetToTakeLog = (req, res, next) => {
  const statusToRetrieve = "initié";

  const sqlQuery = `
    SELECT id, orderDate, hub, userInfo
    FROM orders
    WHERE statusOrder = '${statusToRetrieve}';
  `;

  // Ici, vous exécuteriez la requête SQL dans votre base de données pour obtenir les résultats
  // Assurez-vous que les résultats de la requête sont stockés dans la variable queryResults

  db.query(sqlQuery, (err, queryResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erreur lors de la récupération des données.'
      });
    }

    const racquetsData = [];

    for (const result of queryResults) {
      racquetsData.push({
        id: result.id,
        orderDate: result.orderDate,
        hub: result.hub.enterprise_name,
        userInfo: result.userInfo.racquet_player
      });
    }

    res.status(200).json({
      message: "List of racquets to take retrieved successfully",
      racquetsData: racquetsData
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




     




 












