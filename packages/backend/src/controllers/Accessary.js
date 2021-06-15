const { Accessary } = require('../models');
const {find, findOne, create } = require('../configs/controller.template.config')(Accessary);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}