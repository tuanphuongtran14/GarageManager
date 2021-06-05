const CarBrandRouter = require('./CarBrand');
const ReceivingFormRouter = require('./ReceivingForm');

module.exports = function(app) {
  app.use('/api/car-brands', CarBrandRouter);
  app.use('/receiving-form', ReceivingFormRouter);
}