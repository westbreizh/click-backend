const express = require('express');
const router = express.Router();

const shopCtrl = require('../controllers/shop');


router.post('/productListRandom', shopCtrl.productListRandom);
router.post('/stringListFiltered', shopCtrl.stringListFiltered);
router.post('/ballListFiltered', shopCtrl.ballListFiltered);
router.post('/accessoriesListFiltered', shopCtrl.accessoriesListFiltered);
router.post('/productSelected', shopCtrl.productSelected);


module.exports = router;

