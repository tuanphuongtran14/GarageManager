const { Accessary } = require('../models');
const CRUDController = require('./CRUD.template')(Accessary);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    ...CRUDController
    // Include your custom controller here
}