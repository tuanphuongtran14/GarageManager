var express = require('express');
var router = express.Router();
const { create, find, findOne, deleteOne } = require('../controllers/CarBrand');

/* GET find car brands list */
router.get('/:id', findOne);

/* DELETE one car brand*/
router.delete('/:id', deleteOne);

/* GET find car brands list */
router.get('/', find);

/* POST create new car brand */
router.post('/', create);


module.exports = router;