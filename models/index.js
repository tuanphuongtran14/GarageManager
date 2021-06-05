const mongoose = require('mongoose');
const dbConfig = require('../configs/database.config');
const { initCustomer } = require('./Customer');
const { initCar } = require('./Car');
const { initCarBrand } = require('./CarBrand')
const { initReceivingForm } = require('./ReceivingForm')

const db = {};

// Init mongoose and database URL
db.mongoose = mongoose;
db.url = dbConfig.URL;

// Init Models
db.Customer = initCustomer(mongoose);
db.Car = initCar(mongoose);
db.CarBrand = initCarBrand(mongoose);
db.ReceivingForm = initReceivingForm(mongoose);

module.exports = db;