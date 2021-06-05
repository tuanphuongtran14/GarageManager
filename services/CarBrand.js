const { CarBrand } = require('../models');

exports.create = input => {
    let newCarBrand = new CarBrand({
        ...input
    });

    return newCarBrand.save();
}