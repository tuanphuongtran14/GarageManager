const CarBrandRouter = require('./CarBrand');
const CarRouter = require('./Car');
const AccessaryRouter = require('./Accessary');
const ReceivingFormRouter = require('./ReceivingForm');
const WageRouter = require('./Wage');
const RepairVoteRouter = require('./RepairVote');
const CustomerRouter = require('./Customer');

module.exports = function(app) {
  app.use('/api/car-brands', CarBrandRouter);
  app.use('/api/cars', CarRouter);
  app.use('/api/receiving-forms', ReceivingFormRouter);
  app.use('/api/accessaries', AccessaryRouter);
  app.use('/api/wages', WageRouter);
  app.use('/api/repair-votes', RepairVoteRouter)
  app.use('/api/customers', CustomerRouter)
}