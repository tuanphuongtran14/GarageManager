const mongoose = require('mongoose');
const dbConfig = require('../configs/database.config');
const { initCustomer } = require('./Customer');
const { initCar } = require('./Car');
const { initCarBrand } = require('./CarBrand');
const { initReceivingForm } = require('./ReceivingForm');
const { initAccessory } = require('./Accessory');
const { initWage } = require('./Wage');
const { initRepairVoteDetail } = require('./RepairVoteDetail');
const { initRepairVote } = require('./RepairVote');
const { initBill } = require('./Bill');

const db = {};

// Init mongoose and database URL
db.mongoose = mongoose;
db.url = dbConfig.URL;

// Init Models
db.Customer = initCustomer(mongoose);
db.Car = initCar(mongoose);
db.CarBrand = initCarBrand(mongoose);
db.ReceivingForm = initReceivingForm(mongoose);
db.Accessory = initAccessory(mongoose);
db.Wage = initWage(mongoose);
db.RepairVote = initRepairVote(mongoose);
db.RepairVoteDetail = initRepairVoteDetail(mongoose);
db.Bill = initBill(mongoose);

module.exports = db;