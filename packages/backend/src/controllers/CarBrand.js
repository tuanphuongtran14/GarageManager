const CarBrandService = require('../services/CarBrand');

exports.create = async (req, res) =>{
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
        let newCarBrand = await CarBrandService.create(input);
        return res.status(201).json(newCarBrand);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || 'Some errors occur while creating new car brand'
        });
    }
}

exports.find = async (req, res) => {
    try {
        let carBrandList = await CarBrandService.find();
        return res.status(200).json(carBrandList);
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || 'Some errors occur while finding car brands list'
        });
    }
}

exports.findOne = async (req, res) => {
    let carBrandID = req.params.id;
    try {
        let carBrand = await CarBrandService.findOne(carBrandID);
        return res.status(200).json(carBrand);
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding car brand with ID ${carBrandID}`
        });
    }
}