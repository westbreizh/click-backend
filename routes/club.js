const express = require('express');
const router = express.Router();
const clubCtrl = require('../controllers/club');


router.post('/clubList', clubCtrl.clubList);


module.exports = router;