const sendForm = require('../services/sendReceivingForm');

module.exports = async (req, res) =>{
    let formInput = req.body;

    // If input is null, return 400 Error
    if(!formInput) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Your input is null/empty'
        });
    }

    // If input is not null
    try {
        let form = await sendForm(formInput);
        return res.status(201).json({
            statusCode: 201,
            message: 'Receiving your form succesfully'
        });
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || 'Some errors occur while receiving your form'
        });
    }
}