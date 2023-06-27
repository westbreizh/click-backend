const express = require('express');
const router = express.Router();

const stripeCtrl = require('../controllers/stripes');


router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);



module.exports = router;

