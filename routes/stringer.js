const express = require('express');
const router = express.Router();
const stringerCtrl = require('../controllers/stringer');
const authenticateJWTandXSRF = require('../middleware/authenticateJWTandXSRF '); 


router.use(authenticateJWTandXSRF);

router.post('/ordertSelectedByStatus', stringerCtrl.ordertSelectedByStatus);
router.post('/change-status-order', stringerCtrl.changeStatusOrder);
router.post('/oneOrder', stringerCtrl.sendOneOrder);
router.post('/onePlayer', stringerCtrl.sendOnePlayer);

module.exports = router;




