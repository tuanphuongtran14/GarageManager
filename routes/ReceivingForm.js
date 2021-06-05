var express = require('express');
var router = express.Router();
const sendForm = require('../controllers/sendReceivingForm');

/* POST send new receiving form */
router.post('/send', sendForm);

module.exports = router;