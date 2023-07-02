const express = require('express');
const router = express.Router();

const stripeCtrl = require('../controllers/stripes');


router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);
router.post('/webhook', stripeCtrl.actionAfterPaiement);


module.exports = router;

