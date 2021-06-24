const { Accessory } = require('../models');
const accessoryServices = require('../services/Accessory');
const {find, findOne, create, deleteOne } = require('../configs/controller.template.config')(Accessory);

/* ````````````Declare your custom controller here `````````````````````*/

const searchName = async (req, res) => {
    let input = req.query.name;
    try {
        let accessory = await Accessory.find({ name: input});
        if (accessory.length > 0)
            return res.status(201).json(accessory);
        return res.status(400).json({
            statusCode: 400,
            error: 'No accessory matches this name'
        })
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors happened when finding accessory`
        });
    }
}

/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create,
    deleteOne,
    searchName
}