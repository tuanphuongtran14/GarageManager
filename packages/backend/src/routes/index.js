const CarBrandRouter = require('./CarBrand');
const CarRouter = require('./Car');
const AccessoryRouter = require('./Accessory');
const ReceivingFormRouter = require('./ReceivingForm');
const WageRouter = require('./Wage');
const RepairVoteRouter = require('./RepairVote');
const CustomerRouter = require('./Customer');
const AccountRouter = require('./Account');
const ParameterRouter = require('./Parameter')

module.exports = function(app) {
  app.use('/api/car-brands', CarBrandRouter);
  app.use('/api/cars', CarRouter);
  app.use('/api/receiving-forms', ReceivingFormRouter);
  app.use('/api/accessories', AccessoryRouter);
  app.use('/api/wages', WageRouter);
  app.use('/api/repair-votes', RepairVoteRouter)
  app.use('/api/customers', CustomerRouter)
  app.use('/api/accounts', AccountRouter)
  app.use('/api/parameters', ParameterRouter)
}