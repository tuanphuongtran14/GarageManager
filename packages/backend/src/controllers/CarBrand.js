const { CarBrand, Parameter } = require('../models');
const {find, findOne } = require('../configs/controller.template.config')(CarBrand);
const CarBrandService = require('../configs/service.template.config')(CarBrand);

/* ````````````Declare your custom controller here `````````````````````*/

const create = async (req, res) => {
    let input = req.body;
    let carBrandList = await CarBrandService.find();
    if (!input.name) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Must provide name of car brand'
        })
    }
    for (let i = 0; i < carBrandList.length; i++) {
        if (input.name === carBrandList[i].name)
            return res.status(400).json({
                statusCode: 400,
                error: 'This car brand has already been in database'
            })
    }

    // create new car brand
    try {
        await CarBrandService.create(input);
        // update parameter
        let parameter = await Parameter.findOne({});
        parameter.numberOfCarBrand += 1;
        await Parameter.update({}, parameter);

        res.status(201).json({
            statusCode: 201,
            message: 'Create new car brand successfully'
        })
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors happened when creating car brand`
        });
    }
}
/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}