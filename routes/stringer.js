const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT '); 
const userCtrl = require('../controllers/user');



// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());

router.post('/signupStringer', userCtrl.signupStringer);
router.post('/ordertSelectedByStatus', authenticateJWT,  shopCtrl.ordertSelectedByStatus);
router.post('/change-status-order', authenticateJWT,  shopCtrl.changeStatusOrder);
router.post('/oneOrder', authenticateJWT, shopCtrl.sendOneOrder);
router.post('/onePlayer', authenticateJWT, shopCtrl.sendOnePlayer);










module.exports = router;




