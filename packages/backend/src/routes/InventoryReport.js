var express = require('express');
var router = express.Router();
const { create, find, findOne } = require('../controllers/InventoryReport');

/* GET find car brands list */
router.get('/:id', findOne);

/* GET find car brands list */
router.get('/', find);

/* POST create new car brand */
router.post('/', create);


module.exports = router;