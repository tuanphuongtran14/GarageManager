var express = require('express');
var router = express.Router();
const { find, create, findOne } = require('../controllers/Accessory');

/* GET find accessories list */
router.get('/:id', findOne);

/* GET find accessories list */
router.get('/', find);

/* POST create new accessory */
router.post('/', create);


module.exports = router;