const express = require('express');
const router = express.Router();
const shopCtrl = require('../controllers/shop');
const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF '); 
const validatePaiementInShop = require('../middleware/validationInput/validatePaiementInShop');

router.post('/productListRandom', shopCtrl.productListRandom);
router.post('/stringListFiltered', shopCtrl.stringListFiltered);
router.post('/ballListFiltered', shopCtrl.ballListFiltered);
router.post('/accessoriesListFiltered', shopCtrl.accessoriesListFiltered);
router.post('/productSelected', shopCtrl.productSelected);
router.post('/listHubCollect', shopCtrl.listHubCollect);
router.post('/listHubWithdrawal', shopCtrl.listHubWithdrawal);

router.post('/paiement-in-shop',validatePaiementInShop, authenticateJWTandXSRF,  shopCtrl.saveOrderPaiementInShop);





module.exports = router;

