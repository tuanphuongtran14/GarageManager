var express = require('express');
var router = express.Router();
const { find, create, findOne, search } = require('../controllers/Car');

/* POST search car by lisence plate */
router.post('/search', search);

/* GET find cars list */
router.get('/:id', findOne);

/* GET find cars list */
router.get('/', find);

/* POST create new car */
router.post('/', create);


module.exports = router;