const { CarBrand } = require('../models');
const {find, findOne, create } = require('../configs/controller.template.config')(CarBrand);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}