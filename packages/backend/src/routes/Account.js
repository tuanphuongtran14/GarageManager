var express = require('express');
var router = express.Router();
const { find, create, findOne } = require('../controllers/Account');

/* POST create new accessary */
router.post('/', create);


module.exports = router;