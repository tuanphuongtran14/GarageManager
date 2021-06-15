const { Accessary } = require('../models');
const accessaryServices = require('../services/Accessary');
const {find, findOne, create } = require('../configs/controller.template.config')(Accessary);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}