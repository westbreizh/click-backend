const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT '); 
const userCtrl = require('../controllers/player');
router.use(express.json()); // Middleware d'analyse JSON pour toutes les routes du routeur


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/isTokenYeatOk', authenticateJWT,userCtrl.isTokenYeatOk );
router.post('/createOrUploadCoordinate', authenticateJWT, userCtrl.createOrUploadCoordinate);
router.post('/savePreferencePlayer', authenticateJWT, userCtrl.savePreferencePlayer);
router.post('/loadDataPlayerAfterModif', authenticateJWT, userCtrl.loadDataPlayerAfterModif);


router.post('/sendEmailToResetPassword', userCtrl.sendEmailToResetPassword);
router.post('/saveResetPassword', userCtrl.saveResetPassword);


router.post('/orderLog', authenticateJWT, userCtrl.sendOrderLog);
router.post('/oneOrder', authenticateJWT, userCtrl.sendOneOrder);


module.exports = router;




//const passwordSchema = require("../middleware/passwordValidate");
//const rateLimit = require("../middleware/rate-limit");
