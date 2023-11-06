const express = require('express');
const router = express.Router();
const stripeCtrl = require('../controllers/stripes');
//const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF'); // a voir si necessaire
//const sessionMiddleware = require('../middleware/sessionMiddleware'); // a voir si necessaire
 

// Appliquez sessionMiddleware à toutes les routes
//router.use(sessionMiddleware);

router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);
router.post('/webhook', express.raw({type: 'application/json'}), stripeCtrl.actionAfterPaiement);


module.exports = router;

