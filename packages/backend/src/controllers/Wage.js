const { Wage } = require('../models');
const CRUDController = require('./CRUD.template')(Wage);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    ...CRUDController
    // Include your custom controller here
}