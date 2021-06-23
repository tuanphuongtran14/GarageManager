const { Account } = require('../models');
const bcrypt = require('bcrypt');
const AccountService = require('../services/Account');

/* ````````````Declare your custom controller here `````````````````````*/


/* `````````````````````````````````````````````````````````````````````*/

const create = async (req, res) => {
    let formInput = req.body;

    // If input is null, return 400 Error
    if (!formInput) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Your input is null/empty'
        });
    }

    // Validation
    if (formInput.name.length < 7) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Your account must be at least 7 characters'
        })
    }
    if (formInput.password.length < 7) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Your password must be at least 7 characters'
        })
    }

    // Hash password and save in db
    await bcrypt.hash(formInput.password, 7, function (err, hashedPassword) {
        if (err)
            throw new Error(err);
        formInput.hashedPassword = hashedPassword;
        try {
            AccountService.create(formInput);
            return res.status(201).json({
                statusCode: 201,
                message: 'Create account successfully'
            });
        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: err.message || 'Some errors occur while creating account'
            });
        }
    });
}

module.exports = {
    create
}