const { Accessory } = require('../models');
const accessoryServices = require('../services/Accessory');
const {find, findOne, create } = require('../configs/controller.template.config')(Accessory);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}