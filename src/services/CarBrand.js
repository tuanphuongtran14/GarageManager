const { CarBrand } = require('../models');

exports.create = input => {
    let newCarBrand = new CarBrand({
        ...input
    });

    return newCarBrand.save();
}

exports.find = () =>{
    return CarBrand.find({});
}

exports.findOne = (CarBrandID) =>{
    return CarBrand.findById(CarBrandID);
}