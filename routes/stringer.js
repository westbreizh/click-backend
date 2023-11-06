const express = require('express');
const router = express.Router();
const stringerCtrl = require('../controllers/stringer');
router.use(express.json());  // Middleware d'analyse JSON pour toutes les routes du routeur
const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF '); 
const sessionMiddleware = require('../middleware/sessionMiddleware'); 

// Appliquez sessionMiddleware à toutes les routes
router.use(sessionMiddleware);

router.post('/ordertSelectedByStatus', authenticateJWTandXSRF,  stringerCtrl.ordertSelectedByStatus);
router.post('/change-status-order', authenticateJWTandXSRF,  stringerCtrl.changeStatusOrder);
router.post('/oneOrder', authenticateJWTandXSRF, stringerCtrl.sendOneOrder);
router.post('/onePlayer', authenticateJWTandXSRF, stringerCtrl.sendOnePlayer);



module.exports = router;




