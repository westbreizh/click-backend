const express = require('express');
const router = express.Router();
const stringerCtrl = require('../controllers/stringer');
router.use(express.json());  // Middleware d'analyse JSON pour toutes les routes du routeur
const authenticateJWT = require('../middleware/authenticateJWT '); 


router.post('/signupStringer', stringerCtrl.signupStringer);
router.post('/ordertSelectedByStatus', authenticateJWT,  stringerCtrl.ordertSelectedByStatus);
router.post('/change-status-order', authenticateJWT,  stringerCtrl.changeStatusOrder);
router.post('/oneOrder', authenticateJWT, stringerCtrl.sendOneOrder);
router.post('/onePlayer', authenticateJWT, stringerCtrl.sendOnePlayer);



module.exports = router;




