var express = require('express');
var router = express.Router();
const { create, find, findOne, search } = require('../controllers/ReceivingForm');

/* GET search receiving form */
router.get('/search', search);

/* POST send new receiving form */
router.post('/', create);

/* GET find cars list */
router.get('/:id', findOne);

/* GET find cars list */
router.get('/', find);

module.exports = router;