const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT '); 
const userCtrl = require('../controllers/user');



// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());


router.post('/signup', userCtrl.signup);
router.post('/signupHub', userCtrl.signupHub);
router.post('/signupStringer', userCtrl.signupStringer);
router.post('/login', userCtrl.login);

router.post('/sendEmailToResetPassword', userCtrl.sendEmailToResetPassword);
router.post('/saveResetPassword', userCtrl.saveResetPassword);

router.post('/createOrUploadCoordinate', authenticateJWT, userCtrl.createOrUploadCoordinate);


router.post('/orderLog', authenticateJWT, userCtrl.sendOrderLog);
router.post('/oneOrder', authenticateJWT, userCtrl.sendOneOrder);


//router.delete('/:id', authenticateJWT, userCtrl.deleteUser);


module.exports = router;



//router.get('/:id', userCtrl.getOneUser);
//router.put('/:id', userCtrl.modifyOneUser);
//const passwordSchema = require("../middleware/passwordValidate");
//const rateLimit = require("../middleware/rate-limit");
//router.post('/registerPreferencePlayer', userCtrl.registerPreferencePlayer);
