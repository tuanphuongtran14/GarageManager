const { Car } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line

exports.search = licensePlate => {
    return Car.findOne({licensePlate: licensePlate}).populate('carOwner').populate('carBrand');
}

exports.find = () =>{
    return Car.find({}).populate('carOwner').populate('carBrand');
}
/* `````````````````````````````````` */
