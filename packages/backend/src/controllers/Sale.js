const { Sale } = require('../models');
const SaleService = require('../services/Sale');

/* ````````````Declare your custom controller here `````````````````````*/

const create =  (req, res) => {
    try {
        let currentTime = new Date();
        let currentMonth = currentTime.getMonth() + 1;
        let currentYear = currentTime.getFullYear();
        res.send('Arsenal');
    } catch(err) {
        if (err)
            throw new Error(err);
    }
    // If input is not null, create new car brand
    /* try {
        let Sale = await SaleService.create(input);
        return res.status(201).json(Sale);
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || 'Some errors occur while creating new repair vote'
        });
    } */
}

const find = async (req, res) => {
    try { 
        let objList = await SaleService.find();
        return res.status(200).json(objList);
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding repair votes list`
        });
    }
}

const findOne = async (req, res) => {
    try {
        const id = req.params.id
        let objList = await SaleService.findOne(id);
        return res.status(200).json(objList);
    } catch(err) {
        return res.status(500).json({
            statusCode: 500,
            message: err.message || `Some errors occur while finding repair votes list`
        });
    }
}

/* `````````````````````````````````````````````````````````````````````*/

module.exports = {
    find,
    findOne,
    create
}