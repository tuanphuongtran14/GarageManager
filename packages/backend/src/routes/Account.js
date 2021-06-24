var express = require('express');
var router = express.Router();
const { create, login } = require('../controllers/Account');

/* POST create new accessary */
router.post('/', create);

router.post('/login', login);

module.exports = router;