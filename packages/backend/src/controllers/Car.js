const { Car } = require('../models');
const CarServices = require('../services/Car');
const { findOne, create } = require('./CRUD.template')(Car);

/* ````````````Declare your custom controller here `````````````````````*/

const search = async (req, res) => {
    let licensePlate = req.body.licensePlate;

    // If input is null, return 400 Error
    if(!licensePlate) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Your input is null/empty'
        });
    }

    // If input is not null, create new car brand
    try {
        let car = await CarServices.search(licensePlate);
        return res.status(200).json(car);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while find car with license plate ${licensePlate}`
        });
    }
}

const find = async (req, res) => {
    try {
        let objList = await CarServices.find();
        return res.status(200).json(objList);
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding cars list`
        });
    }
};
/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    search,
    find,
    findOne, 
    create
    // Include your custom controller here
}