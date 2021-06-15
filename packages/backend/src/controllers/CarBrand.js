const CarBrandService = require('../services/CarBrand');
const {find, findOne, create } = require('../configs/controller.template.config')(CarBrandService);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}