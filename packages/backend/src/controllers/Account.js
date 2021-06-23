const { Account } = require('../models');
const accountServices = require('../services/Account');
const {find, findOne, create } = require('../configs/controller.template.config')(Account);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}