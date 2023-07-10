const express = require('express');
const router = express.Router();
const passwordSchema = require("../middleware/passwordValidate");
const rateLimit = require("../middleware/rate-limit");
const auth = require('../middleware/auth'); 
const userCtrl = require('../controllers/user');

//router.post('/signup', passwordSchema, userCtrl.signup);
//router.post('/login',rateLimit, passwordValidate, userCtrl.login);  

//router.post('/changePassword',auth, userCtrl.changePassword);

// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//router.post('/registerPreferencePlayer', userCtrl.registerPreferencePlayer);

router.post('/sendEmailToResetPassword', userCtrl.sendEmailToResetPassword);

router.post('/createOrUploadCoordinate', auth, userCtrl.createOrUploadCoordinate);
router.post('/changeEmail', auth, userCtrl.changeEmail);
router.post('/changePassword', auth, userCtrl.changePassword);

router.post('/orderLog', auth, userCtrl.sendOrderLog);

router.delete('/:id', auth, userCtrl.deleteUser);


//router.get('/:id', userCtrl.getOneUser);
//router.put('/:id', userCtrl.modifyOneUser);


module.exports = router;