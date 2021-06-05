var express = require('express');
var router = express.Router();
const { create } = require('../controllers/CarBrand');

/* POST create new car brand */
router.post('/', create);

module.exports = router;