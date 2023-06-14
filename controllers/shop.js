
//module pour envoyer des emails
const nodemailer = require('nodemailer');
const sendEmail = require("../email/sendEmail")

// fichier pour se connecter à notre base de donnée
const db = require("../BDD/database-connect")


// on récupère le produit sélectionné via le id et la catégorie(nom du tableau)
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
        message: 'erreur avec la base de donnée'
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









     




 












