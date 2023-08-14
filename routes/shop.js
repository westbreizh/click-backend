const express = require('express');
const router = express.Router();
const shopCtrl = require('../controllers/shop');
const authenticateJWT = require('../middleware/authenticateJWT '); 

// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());

router.post('/productListRandom', shopCtrl.productListRandom);
router.post('/stringListFiltered', shopCtrl.stringListFiltered);
router.post('/ballListFiltered', shopCtrl.ballListFiltered);
router.post('/accessoriesListFiltered', shopCtrl.accessoriesListFiltered);
router.post('/productSelected', shopCtrl.productSelected);
router.post('/listHubCollect', shopCtrl.listHubCollect);
router.post('/listHubWithdrawal', shopCtrl.listHubWithdrawal);
router.post('/listHubWithdrawal', shopCtrl.listHubWithdrawal);
router.post('/paiement-in-shop', shopCtrl.saveOrderAndPreferencePlayer);

router.post('/racquetToTakeLog', shopCtrl.racquetToTakeLog);
router.post('/oneOrder', authenticateJWT, shopCtrl.sendOneOrder);


module.exports = router;

