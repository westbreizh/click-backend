const express = require('express');
const router = express.Router();
const shopCtrl = require('../controllers/shop');
const authenticateJWT = require('../middleware/authenticateJWT '); 
router.use(express.json()); // Middleware d'analyse JSON pour toutes les routes du routeur


router.post('/productListRandom', shopCtrl.productListRandom);
router.post('/stringListFiltered', shopCtrl.stringListFiltered);
router.post('/ballListFiltered', shopCtrl.ballListFiltered);
router.post('/accessoriesListFiltered', shopCtrl.accessoriesListFiltered);
router.post('/productSelected', shopCtrl.productSelected);
router.post('/listHubCollect', shopCtrl.listHubCollect);
router.post('/listHubWithdrawal', shopCtrl.listHubWithdrawal);
router.post('/paiement-in-shop', shopCtrl.saveOrderAndPreferencePlayer);




module.exports = router;

