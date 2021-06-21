const { ReceivingForm } = require('../models');
const { findOne, create } = require('../configs/controller.template.config')(ReceivingForm);
const ReceivingFormService = require('../services/ReceivingForm');

/* ````````````Declare your custom controller here `````````````````````*/
const send = async (req, res) => {
    /* let formInput = req.body; */
    let formInput = {
        name: 'Nguyen Huu Phat',
        
    }


    // If input is null, return 400 Error
    if (!formInput) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Your input is null/empty'
        });
    } else {
        const receivingForm = await ReceivingForm.findOne({
            licensePlate: formInput.licensePlate,
            isRepaired: false
        })

        console.log(receivingForm);

        if (receivingForm !== null)
            return res.status(400).json({
                statusCode: 400,
                message: 'That car has already received'
            });
    }

    // If input is not null
    try {
        await ReceivingFormService.sendForm(formInput);
        return res.status(201).json({
            statusCode: 201,
            message: 'Receiving your form succesfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            statusCode: 500,
            message: err.message || 'Some errors occur while receiving your form'
        });
    }
}

const find = async (req, res) => {
    try {
        let objList = await ReceivingFormService.find();
        return res.status(200).json(objList);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding receiving forms list`
        });
    }
}
/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create,
    send
}

