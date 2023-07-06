const express = require('express');
const router = express.Router();
const stripeCtrl = require('../controllers/stripes');
const multer = require('multer');
const upload = multer().none();

router.post('/create-checkout-session', upload, stripeCtrl.createCheckOutSession);
router.post('/webhook', express.raw({type: 'application/json'}), stripeCtrl.actionAfterPaiement);

module.exports = router;


