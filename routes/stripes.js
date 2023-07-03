const express = require('express');
const router = express.Router();
const getRawBody = require('raw-body');

const stripeCtrl = require('../controllers/stripes');


router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);
router.post('/webhook', async (req, res, next) => {
    try {
      req.rawBody = await getRawBody(req);
      next();
    } catch (err) {
      next(err);
    }
  }, stripeCtrl.actionAfterPaiement);
  


module.exports = router;

