const express = require('express');
const router = express.Router();
const stringerCtrl = require('../controllers/stringer');
const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF '); 
const sessionMiddleware = require('../middleware/sessionMiddleware'); 

// Appliquez sessionMiddleware analyse JSON  et autentification token et xsrfToken à toutes les routes 
router.use(express.json());
//router.use(sessionMiddleware);
router.use(authenticateJWTandXSRF);

router.post('/ordertSelectedByStatus', stringerCtrl.ordertSelectedByStatus);
router.post('/change-status-order', stringerCtrl.changeStatusOrder);
router.post('/oneOrder', stringerCtrl.sendOneOrder);
router.post('/onePlayer', stringerCtrl.sendOnePlayer);

module.exports = router;




