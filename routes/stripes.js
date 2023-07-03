const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const stripeCtrl = require('../controllers/stripes');

router.use(bodyParser.raw({ type: 'application/json' }));

router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);
router.post('/webhook', stripeCtrl.actionAfterPaiement);

module.exports = router;
