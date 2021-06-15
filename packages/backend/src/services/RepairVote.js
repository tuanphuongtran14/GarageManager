const { RepairVote, RepairVoteDetail, Wage, Accessary, ReceivingForm, Car } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    let totalPrice = 0;
    let details = [];

    // Check if exist receivingForm
    let receivingForm = await ReceivingForm.findById(input.receivingForm);
    if(!receivingForm)
        throw new Error(`Not exist the receiving form with id ${input.receivingForm}`)

    // Create repair vote details
    for(let i = 0; i < input.details.length; i++) {
        let wage = await Wage.findById(input.details[i].wage);
        let accessary = await Accessary.findById(input.details[i].accessary);
        input.details[i].price = wage.price + accessary.unitPrice * input.details[i].quantity;

        let newRepairVoteDetail = new RepairVoteDetail({
            ...input.details[i]
        });
        await newRepairVoteDetail.save();

        totalPrice += newRepairVoteDetail.price;
        details.push(newRepairVoteDetail._id)
        test = 2;
    }

    input.totalPrice = totalPrice;
    input.details = details;

    let car = await Car.findById(receivingForm.car);
    car.debt += totalPrice;
    await car.save();
    
    // Create repair vote base on input
    let newRepairVotes = await new RepairVote({
        ...input
    });
    await newRepairVotes.save();

    return newRepairVotes;
}
/* `````````````````````````````````` */
