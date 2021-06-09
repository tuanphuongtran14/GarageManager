const { Car } = require('../models');

exports.search = licensePlate => {
    return Car.findOne({licensePlate: licensePlate}).populate('carOwner').populate('carBrand');
}