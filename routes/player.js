const express = require('express');
const router = express.Router();
const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF '); 
const userCtrl = require('../controllers/player');
const limiter = require("../middleware/rate-limit");
const validateLogin = require("../middleware/validationInput/validateLogin");
const validateSignup = require("../middleware/validationInput/validateSignup");

router.post('/signup', validateSignup, limiter, userCtrl.signup);
router.post('/login',validateLogin, limiter, userCtrl.login);
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


// dans modalchangepassword ??
//const response = await fetch(`https://click-backend.herokuapp.com/api/user/changePassword`, {

