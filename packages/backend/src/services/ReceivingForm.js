const { Customer, Car, CarBrand, ReceivingForm } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async formInput => {
    // If phone number has already existed, find its owner
    let customer = await Customer.findOne({
        phoneNumber: formInput.phoneNumber
    });

    // If phone number has not existed, create new customer
    if (!customer) {
        customer = await new Customer({
            name: formInput.name,
            phoneNumber: formInput.phoneNumber,
            address: formInput.address,
        }).save();
    }

    // If car has already existed, find it
    let car = await Car.findOne({
        licensePlate: formInput.licensePlate
    });


    // If car has not existed, create new car
    if (!car) {
        let carBrand = await CarBrand.findOne({
            name: formInput.carBrand
        });
        
        car = await new Car({
            licensePlate: formInput.licensePlate,
            carOwner: customer._id,
            carBrand: carBrand._id,
        }).save();

    } else {
        if (car.carOwner.toString() !== customer._id.toString()) {
            throw new Error(`Customer is not car owner`);
        }
    }
 
    // Create new receiving form
    let receivingForm = await new ReceivingForm({
        car: car._id,
        /* receivingDate: new Date(formInput.receivingDate), */
    });

    await receivingForm.save();
    
    return receivingForm;
}

exports.find = () => {
    return ReceivingForm.find({}).populate({ 
        path: 'car',
        populate: [
            {
            path: 'carOwner',
            model: 'Customer'
            },
            {
                path: 'carBrand',
                model: 'CarBrand'
            }
        ]
     });
}

exports.findOne = (id) => {
    return ReceivingForm.findOne({ _id: id }).populate({ 
        path: 'car',
        populate: [
            {
            path: 'carOwner',
            model: 'Customer'
            },
            {
                path: 'carBrand',
                model: 'CarBrand'
            }
        ]
     });
}
/* `````````````````````````````````` */

