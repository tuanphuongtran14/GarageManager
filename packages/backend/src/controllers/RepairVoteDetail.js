const { RepairVoteDetail } = require('../models');
const CRUDController = require('./CRUD.template')(RepairVoteDetail);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    ...CRUDController
    // Include your custom controller here
}