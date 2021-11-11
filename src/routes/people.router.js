const PeopleController = require('../app/controller/PeopleController');
const createValidation = require('../app/validation/people/create');
const idValidation = require('../app/validation/id');
const errors = require('../app/middlewares/errors');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createValidation, PeopleController.create);
  routes.get('/', PeopleController.getAll);
  routes.get('/:id', idValidation, PeopleController.get);
  routes.put('/:id', createValidation, idValidation, PeopleController.update);
  routes.delete('/:id', idValidation, PeopleController.delete);
  server.use(prefix, routes, errors);
};
