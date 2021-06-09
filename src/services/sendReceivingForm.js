const { Customer, Car, CarBrand, ReceivingForm } = require('../models');

module.exports = async formInput => {
    // If phone number has already existed, find its owner
    let customer = await Customer.findOne({
        phoneNumber: formInput.phoneNumber
    });

    // If phone number has not existed, create new customer
    if(!customer) {
        customer = await new Customer({
            name: formInput.name,
            phoneNumber: formInput.phoneNumber,
            address: formInput.address,
            email: formInput.email
        }).save();
    }

    // If car has already existed, find it
    let car = await Car.findOne({
        licensePlate: formInput.licensePlate
    });

    // If car has not existed, create new car
    if(!car) {
        let carBrand = await CarBrand.findOne({
            name: formInput.carBrand
        });

        car = await new Car({
            licensePlate: formInput.licensePlate,
            carOwner: customer._id,
            carBrand: carBrand._id,
            debt: 0,
            isRepaired: false
        }).save();
    } else {
        if(car.carOwner !== customer._id) {
            throw new Error(`Custom is not car owner`);
        }
    }
 
    // Create new receiving form
    let receivingForm = await new ReceivingForm({
        car: car._id,
        receivingDate: new Date(formInput.receivingDate)
    });

    await receivingForm.save();
    
    return receivingForm;
}