const express = require('express');
const router = express.Router();
const shopCtrl = require('../controllers/shop');

// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());

router.post('/productListRandom', shopCtrl.productListRandom);
router.post('/stringListFiltered', shopCtrl.stringListFiltered);
router.post('/ballListFiltered', shopCtrl.ballListFiltered);
router.post('/accessoriesListFiltered', shopCtrl.accessoriesListFiltered);
router.post('/listHubCollect', shopCtrl.listHubCollect);
router.post('/listHubWithdrawal', shopCtrl.listHubWithdrawal);

module.exports = router;

