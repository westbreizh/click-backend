const express = require('express');
const router = express.Router();
const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF '); 
const userCtrl = require('../controllers/player');
const limiter = require("../middleware/rate-limit");
const validateLogin = require("../middleware/validationInput/validateLogin");
const validateSignup = require("../middleware/validationInput/validateSignup");
const validateEmail = require("../middleware/validationInput/validateEmail");
const validateSaveResetPassword = require("../middleware/validationInput/validateSaveResetPassword");


router.post('/signup', validateSignup, limiter, userCtrl.signup);
router.post('/login',validateLogin, limiter, userCtrl.login);
router.post('/sendEmailToResetPassword', validateEmail, limiter, userCtrl.sendEmailToResetPassword);
router.post('/saveResetPassword', validateSaveResetPassword, limiter, userCtrl.saveResetPassword);

router.post('/createOrUploadCoordinate', authenticateJWTandXSRF, userCtrl.createOrUploadCoordinate);
router.post('/savePreferencePlayer', authenticateJWTandXSRF, userCtrl.savePreferencePlayer);
router.post('/loadDataPlayerAfterModif', authenticateJWTandXSRF, userCtrl.loadDataPlayerAfterModif);
router.post('/orderLog', authenticateJWTandXSRF,  userCtrl.sendOrderLog);
router.post('/oneOrder', authenticateJWTandXSRF, userCtrl.sendOneOrder);




module.exports = router;

// ?? ne trouve pas dans le frontend
router.post('/isTokenYeatOk', authenticateJWTandXSRF, userCtrl.isTokenYeatOk);




// dans modalchangepassword ??
//const response = await fetch(`https://click-backend.herokuapp.com/api/user/changePassword`, {

