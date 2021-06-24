const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const { Account, Session } = require('../models');
const AccountService = require('../services/Account');
const AccountServiceTemplate = require('../configs/service.template.config')(Account);

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
    bcrypt.hash(formInput.password, 7, function (err, hashedPassword) {
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

const login = async (req, res) => {
    let input = req.body;

    // check account
    let checkAccount, checkPassword, role;
    let accountList = await AccountServiceTemplate.find().lean();
    for (let i = 0; i < accountList.length; i++) {
        if (accountList[i].name === input.name) {
            checkAccount = true;
            role = accountList[i].role;
        }
        await bcrypt.compare(input.password, accountList[i].hashedPassword).then(function(result) {
            if (result === true)
                checkPassword = true;
        });
    }
    if (!checkAccount || !checkPassword)
        return res.status(400).json({
            statusCode: 400,
            message: 'Login failed'
        });
    
    // set session
    let id = nanoid();
    try {
        const newSession = new Session({
            sessionId: id,
            role
        });
        await newSession.save();
        res.cookie('sessionId', id, {
            signed: true
        });
        return res.status(201).json('Login successfully');
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors happened`
        });
    }
}

module.exports = {
    create,
    login
}