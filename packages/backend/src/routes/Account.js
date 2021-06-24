var express = require('express');
var router = express.Router();
const { create, login, logOut, sendRole } = require('../controllers/Account');

/* POST create new accessary */
router.post('/', create);

/* POST for login and receive sessionId */
router.post('/login', login);

/* GET to log out */
router.get('/log-out', logOut);

/* POST to receive role of current user */
router.post('/role', sendRole);

module.exports = router;