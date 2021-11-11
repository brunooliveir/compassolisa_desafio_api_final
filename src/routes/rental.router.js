const RentalController = require('../app/controller/RentalController');
const createValidation = require('../app/validation/rental/create');
const idValidation = require('../app/validation/id');
const errors = require('../app/middlewares/errors');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createValidation, RentalController.create);
  routes.get('/', RentalController.getAll);
  routes.get('/:id', idValidation, RentalController.get);
  routes.put('/:id', idValidation, createValidation, RentalController.update);
  routes.delete('/:id', idValidation, RentalController.delete);
  server.use(prefix, routes, errors);
};
