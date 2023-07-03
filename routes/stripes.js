const express = require('express');
const router = express.Router();

const stripeCtrl = require('../controllers/stripe');

router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeCtrl.actionAfterPaiement);

module.exports = router;
