const RentalReserveController = require('../app/controller/RentalReserveController');
const createValidation = require('../app/validation/rental/reserve/create');
const idValidation = require('../app/validation/id');
const errors = require('../app/middlewares/errors');

module.exports = (server, routes, prefix = '/api/v1/rental/:idLocadora/reserve') => {
  routes.post('/', createValidation, RentalReserveController.create);
  routes.get('/', RentalReserveController.getAll);
  routes.get('/:id', idValidation, RentalReserveController.get);
  routes.put('/:id', createValidation, idValidation, RentalReserveController.update);
  routes.delete('/:id', idValidation, RentalReserveController.delete);
  server.use(prefix, routes, errors);
};
