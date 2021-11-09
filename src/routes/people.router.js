const PeopleController = require('../app/controller/PeopleController');
const createValidation = require('../app/validation/people/create');
const idValidation = require('../app/validation/people/id');
const errors = require('../app/errors/people/index');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createValidation, errors, PeopleController.create, errors);
  routes.get('/', PeopleController.listQuery, errors);
  routes.get('/:id', idValidation, errors, PeopleController.findOneById, errors);
  routes.put('/:id', createValidation, errors, idValidation, errors, PeopleController.updateById, errors);
  routes.delete('/:id', idValidation, errors, PeopleController.deleteOne, errors);
  server.use(prefix, routes);
};
