const { Wage } = require('../models');
const { find, findOne, create } = require('../configs/controller.template.config')(Wage);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}