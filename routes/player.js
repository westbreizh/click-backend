const express = require('express');
const router = express.Router();
const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF '); 
const sessionMiddleware = require('../middleware/sessionMiddleware'); 
const userCtrl = require('../controllers/player');

// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());

// Appliquez sessionMiddleware à toutes les routes
//router.use(sessionMiddleware);

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/createOrUploadCoordinate', authenticateJWTandXSRF, userCtrl.createOrUploadCoordinate);
router.post('/savePreferencePlayer', authenticateJWTandXSRF, userCtrl.savePreferencePlayer);
router.post('/loadDataPlayerAfterModif', authenticateJWTandXSRF, userCtrl.loadDataPlayerAfterModif);
router.post('/orderLog', authenticateJWTandXSRF,  userCtrl.sendOrderLog);
router.post('/oneOrder', authenticateJWTandXSRF, userCtrl.sendOneOrder);

router.post('/sendEmailToResetPassword', userCtrl.sendEmailToResetPassword);
router.post('/saveResetPassword', userCtrl.saveResetPassword);


module.exports = router;

// ?? ne trouve pas dans le frontend
router.post('/isTokenYeatOk', authenticateJWTandXSRF, userCtrl.isTokenYeatOk);


//const passwordSchema = require("../middleware/passwordValidate");
//const rateLimit = require("../middleware/rate-limit");

// dans modalchangepassword ??
//const response = await fetch(`https://click-backend.herokuapp.com/api/user/changePassword`, {

