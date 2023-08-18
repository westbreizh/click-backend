//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")

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


                //logique pour enregistrement de la commande et preferences joueur//

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




                    //logique côté cordeur//

// fonction qui renvoit la liste des commandes des raquettes à récuperer
exports.racquetToTakeLog = (req, res, next) => {
  const statusToRetrieve = "initié";
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
  
    const racquetsDataToTake = [];
  
    for (const result of queryResults) {
      const hubObject = JSON.parse(result.hub);
      const articleList = JSON.parse(result.articleList);
      
      const racquetPlayerList = []; // Tableau pour stocker les valeurs racquetPlayer
      
      for (const article of articleList) {
        if (article.racquetPlayer) {
          racquetPlayerList.push(article.racquetPlayer);
        }
      }
      
     // console.log("list article", articleList);
    //console.log("racquetPlayerList", racquetPlayerList);
      
      racquetsDataToTake.push({
        id: result.id,
        hub: hubObject.enterprise_name, 
        racquetPlayerList: racquetPlayerList
      });
    }
    
  
    res.status(200).json({
      message: "List of racquets to take retrieved successfully",
      racquetsDataToTake: racquetsDataToTake
    });
  });
  
}

// fonction qui renvoit la liste des commandes des raquettes à corder
exports.racquetToStringLog = (req, res, next) => {
  const statusToRetrieve = "prêt à corder";
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
  
    const racquetsDataToString = [];
  
    for (const result of queryResults) {
      const hubObject = JSON.parse(result.hub);
      const articleList = JSON.parse(result.articleList);
      
      const racquetPlayerList = []; // Tableau pour stocker les valeurs racquetPlayer
      
      for (const article of articleList) {
        if (article.racquetPlayer) {
          racquetPlayerList.push(article.racquetPlayer);
        }
      }
      
     // console.log("list article", articleList);
      //console.log("racquetPlayerList", racquetPlayerList);
      
      racquetsDataToString.push({
        id: result.id,
        hub: hubObject.enterprise_name, 
        racquetPlayerList: racquetPlayerList
      });
    }
    
  
    res.status(200).json({
      message: "List of racquets to string retrieved successfully",
      racquetsDataToString : racquetsDataToString 
    });
  });
  
}

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



// fonction qui renvoit la liste des commandes en fonction du status
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








// Fonction de modification de status et envoie d'email
function modifyOrdersToChangeStatus(orderId, statusOrder, changeStatusDate) {
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
      const statusToUpdate = 'livrée';
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

    // Si tout s'est bien passé, renvoyer un message de succès
    res.status(200).json({ message: 'la modification de status de la commande est effective '});

  } catch (error) {
    console.error('Erreur lors de la modification de status de la commande', error);
    res.status(500).json({ error: 'Erreur lors de la modification de status de la commande' });
  }
}





 







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










// fonction de modification de la table orders après avoir récupéré les raquettes
function modifyOrdersAfterRacquetTaken(racquetTakenList, racquetTakenDate) {
  return new Promise((resolve, reject) => {
    console.log("date de recup racquet", racquetTakenDate);
    console.log("liste de racquet recup", racquetTakenList);

    // Construire la requête SQL pour mettre à jour les données dans la table
    const query = 'UPDATE orders SET statusOrder = ?, racquetTakenDate = ? WHERE id = ?';

    const statusToUpdate = 'prêt à corder'; // Nouveau statut à définir

    // Boucle pour exécuter la mise à jour pour chaque élément
    for (const orderId of racquetTakenList) {
      db.query(query, [statusToUpdate, racquetTakenDate, orderId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour de la commande :', error);
          reject(error);
          return;
        } else {
          console.log("orderId", orderId);
          console.log("Statut et date mis à jour avec succès pour la commande", orderId);
          if (orderId === racquetTakenList[racquetTakenList.length - 1]) {
            // Si c'est la dernière commande, résoudre la promesse
            resolve(results);
          }
        }
      });
    }
  });
}
// fonction de recuperation des infos du joueur (email, prenom, raquette ), de la date et du lieu de récupération de la raquette 
// payload tableau des id de la table orders
function takeInfosFromOrdersToSendEmails(racquetTakenList, racquetTakenDate) {
  return new Promise((resolve, reject) => {
    console.log("date de recup racquet", racquetTakenDate);
    console.log("liste de racquet recup", racquetTakenList);

    // Construire la requête SQL pour mettre à jour les données dans la table
    
    const query = 'SELECT * FROM player  WHERE id = ?';

    const arrayInfosForSendEmail =[]

    // Boucle pour récupérer à les infos pour chaque élément
    for (const orderId of racquetTakenList) {
      db.query(query, [ orderId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la récupération des données dans takeInfosFromOrdersToSendEmails  :', error);
          reject(error);
          return;
        } else {
          arrayInfosForSendEmail.push(results.userInfo)
          
          console.log("Statut et date mis à jour avec succès pour la commande", orderId);
          if (orderId === racquetTakenList[racquetTakenList.length - 1]) {
            // Si c'est la dernière commande, résoudre la promesse
            console.log(arrayInfosForSendEmail)
            resolve(results);
          }
        }
      });
    }
  });
}
// Fonction pour valider la recupération des raquettes
exports.racquetTaken = async (req, res) => {
  console.log("Je rentre dans le backend pour valider la recupération des raquettes");

  try {
    // On récupère les données du frontend depuis le corps de la requête
    const datas = req.body;
    console.log("datsa", datas);
    const racquetTakenList = datas.selectedOrders; 
    console.log("racquetTakenList", racquetTakenList);
    const racquetTakenDate = new Date();

    // On modifie la table orders 
    await modifyOrdersAfterRacquetTaken(racquetTakenList, racquetTakenDate);

    // On récupère les infos pour envoie d'email
    await takeInfosFromOrdersToSendEmails(racquetTakenList);



     // envoie d'email au client
     try {
      await sendEmail(email, 'confirmation de récupération raquette', {
        customerName: firstName,
      }, 'email/template/confirmationColectEmail.handlebars');

      console.log('E-mail de confirmation de récupération raquette envoyé avec succès à', email);
    } catch (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
      return res.sendStatus(500);
    }
    
    // Si tout s'est bien passé, renvoyer un message de succès
    res.status(200).json({ message: 'la liste des raquettes récupérées a été validée ', racquetTakenList: racquetTakenList });

  } catch (error) {
    console.error('Erreur lors de la validation des raquettes récupérées', error);
    res.status(500).json({ error: 'Erreur lors de la validation des raquettes récupérées' });
  }
};












// fonction de modification des preferences joueurs dans la table payer
function savePreferencePlayerToDatabase( hub, hubBack, stringId, stringRope, racquetPlayer, email) {
  return new Promise((resolve, reject) => {
    console.log("stringId"+ stringId)
    console.log("stringRope"+ stringRope)
    console.log("raquete joeuer"+ racquetPlayer)
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

