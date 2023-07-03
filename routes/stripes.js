const express = require('express');
const router = express.Router();
const stripeCtrl = require('../controllers/stripes');
const bodyParser = require('body-parser');

router.use(bodyParser.raw({ type: 'application/json' }));

router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);
router.post('/webhook', express.raw({type: 'application/json', limit: '10mb'}), stripeCtrl.actionAfterPaiement);



module.exports = router;

