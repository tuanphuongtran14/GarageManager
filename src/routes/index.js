const CarBrandRouter = require('./CarBrand');
const AccessaryRouter = require('./Accessary');
const ReceivingFormRouter = require('./ReceivingForm');
const WageRouter = require('./Wage');

module.exports = function(app) {
  app.use('/api/car-brands', CarBrandRouter);
  app.use('/api/receiving-forms', ReceivingFormRouter);
  app.use('/api/accessaries', AccessaryRouter);
  app.use('/api/wages', WageRouter);
}