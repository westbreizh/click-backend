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
router.post('/isTokenYeatOk', authenticateJWTandXSRF, userCtrl.isTokenYeatOk);
router.post('/createOrUploadCoordinate', authenticateJWTandXSRF, userCtrl.createOrUploadCoordinate);
router.post('/savePreferencePlayer', authenticateJWTandXSRF, userCtrl.savePreferencePlayer);
router.post('/loadDataPlayerAfterModif', authenticateJWTandXSRF, userCtrl.loadDataPlayerAfterModif);

router.post('/sendEmailToResetPassword', userCtrl.sendEmailToResetPassword);
router.post('/saveResetPassword', userCtrl.saveResetPassword);

router.post('/orderLog', authenticateJWTandXSRF,  userCtrl.sendOrderLog);
router.post('/oneOrder', authenticateJWTandXSRF, userCtrl.sendOneOrder);

module.exports = router;


//const passwordSchema = require("../middleware/passwordValidate");
//const rateLimit = require("../middleware/rate-limit");
