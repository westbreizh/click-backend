const express = require('express');
const router = express.Router();
const getRawBody = require('raw-body');

const stripeCtrl = require('../controllers/stripes');


router.post('/create-checkout-session', stripeCtrl.createCheckOutSession);
router.post('/webhook1', async (req, res, next) => {
    console.log("dans route"+req)

    try {

      req.rawBody = await getRawBody(req);
      console.log("dans route"+req.rawBody)
      next();
    } catch (err) {
      next(err);
    }
  }, stripeCtrl.actionAfterPaiement);
  


module.exports = router;

