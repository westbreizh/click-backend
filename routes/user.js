const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT '); 
const userCtrl = require('../controllers/user');



// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.post('/sendEmailToResetPassword', userCtrl.sendEmailToResetPassword);

router.post('/createOrUploadCoordinate', authenticateJWT, userCtrl.createOrUploadCoordinate);
router.post('/changeEmail', authenticateJWT, userCtrl.changeEmail);
router.post('/changePassword', authenticateJWT, userCtrl.changePassword);

router.post('/orderLog', authenticateJWT, userCtrl.sendOrderLog);
router.post('/oneOrder', authenticateJWT, userCtrl.sendOneOrder);


router.delete('/:id', authenticateJWT, userCtrl.deleteUser);


module.exports = router;



//router.get('/:id', userCtrl.getOneUser);
//router.put('/:id', userCtrl.modifyOneUser);
//const passwordSchema = require("../middleware/passwordValidate");
//const rateLimit = require("../middleware/rate-limit");
//router.post('/registerPreferencePlayer', userCtrl.registerPreferencePlayer);
