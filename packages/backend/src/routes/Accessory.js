var express = require('express');
var router = express.Router();
const { find, create, findOne, deleteOne, searchName } = require('../controllers/Accessory');

/* GET to find accessory base on name */
router.get('/search', searchName);

/* GET find accessories list */
router.get('/:id', findOne);

/* GET find accessories list */
router.get('/', find);

/* POST create new accessory */
router.post('/', create);


/* DELETE to delete one accessory */
router.delete('/:id', deleteOne);

module.exports = router;