const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const userCtrl = require('../controllers/user');



// Middleware d'analyse JSON pour toutes les routes du routeur
router.use(express.json());


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.post('/sendEmailToResetPassword', userCtrl.sendEmailToResetPassword);

router.post('/createOrUploadCoordinate', auth, userCtrl.createOrUploadCoordinate);
router.post('/changeEmail', auth, userCtrl.changeEmail);
router.post('/changePassword', auth, userCtrl.changePassword);

router.post('/orderLog', auth, userCtrl.sendOrderLog);

router.delete('/:id', auth, userCtrl.deleteUser);


module.exports = router;



//router.get('/:id', userCtrl.getOneUser);
//router.put('/:id', userCtrl.modifyOneUser);
//const passwordSchema = require("../middleware/passwordValidate");
//const rateLimit = require("../middleware/rate-limit");
//router.post('/registerPreferencePlayer', userCtrl.registerPreferencePlayer);
