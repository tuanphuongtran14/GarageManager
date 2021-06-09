const { RepairVote } = require('../models');
const RepairVoteServices = require('../services/RepairVote');
const { find, findOne} = require('./CRUD.template')(RepairVote);

/* ````````````Declare your custom controller here `````````````````````*/

const create = async (req, res) => {
    let input = req.body;

    // If input is null, return 400 Error
    if(!input) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Your input is null/empty'
        });
    }

    // If input is not null, create new car brand
    try {
        let RepairVote = await RepairVoteServices.create(input);
        return res.status(201).json(RepairVote);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || 'Some errors occur while creating new repair vote'
        });
    }
}

/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
    // Include your custom controller here
}