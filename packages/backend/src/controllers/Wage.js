const { Wage } = require('../models');
const { find, findOne, create, deleteOne } = require('../configs/controller.template.config')(Wage);

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

const searchName = async (req, res) => {
    let input = req.query.name;
    try {
        let wage = await Wage.find({ name: input});
        if (wage.length > 0)
            return res.status(201).json(wage);
        return res.status(400).json({
            statusCode: 400,
            error: 'No wages matches this name'
        })
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors happened when finding wage`
        });
    }
}

module.exports = {
    find,
    findOne,
    create,
    deleteOne,
    searchName
}