const RentalFleetController = require('../app/controller/RentalFleetController');
const createValidation = require('../app/validation/rental/fleet/create');
const idValidation = require('../app/validation/id');
const errors = require('../app/middlewares/errors');

module.exports = (server, routes, prefix = '/api/v1/rental/:idLocadora') => {
  routes.post('/car/', createValidation, RentalFleetController.create);
  routes.get('/fleet/', RentalFleetController.getAll);
  routes.get('/fleet/:id', idValidation, RentalFleetController.get);
  routes.put('/fleet/:id', createValidation, idValidation, RentalFleetController.update);
  routes.delete('/fleet/:id', idValidation, RentalFleetController.delete);
  server.use(prefix, routes, errors);
};
