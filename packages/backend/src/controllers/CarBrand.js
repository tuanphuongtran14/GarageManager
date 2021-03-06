const { CarBrand, Parameter } = require('../models');
const {find, findOne, update } = require('../configs/controller.template.config')(CarBrand);
const CarBrandService = require('../configs/service.template.config')(CarBrand);

/* ````````````Declare your custom controller here `````````````````````*/

const searchName = async (req, res) => {
    let query = req.query;
    try {
        let carBrands = await CarBrand.find({});
        if (query.name)
            carBrands = carBrands.filter(carBrand => {
                return nonAccentVietnamese(carBrand.name.toLowerCase()).indexOf(nonAccentVietnamese(query.name.toLowerCase())) !== -1;
            })

        return res.status(200).json(carBrands);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors happened when finding car brands`
        });
    }
}

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

const deleteOne = async (req, res) => {
    let id = req.params.id;
    try {
        let document = await CarBrandService.deleteOne(id);

        // update parameter
        let parameter = await Parameter.findOne({});
        parameter.numberOfCarBrand -= 1;
        await Parameter.update({}, parameter);

        return res.status(200).json(document);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while deleting ${Model} with ID ${id}`
        });
    }
}

/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create,
    searchName,
    update,
    deleteOne
}


// ======================================

function nonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huy???n s???c h???i ng?? n???ng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ??, ??, ??, ??, ??
    return str;
}