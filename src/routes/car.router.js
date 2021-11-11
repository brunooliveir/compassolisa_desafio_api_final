const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const idValidation = require('../app/validation/id');
const idAcessorioValidation = require('../app/validation/car/idAcessorio');
const acessoriosValidation = require('../app/validation/car/acessorios');
const errors = require('../app/middlewares/errors');
const authMid = require('../app/middlewares/auth');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', createValidation, CarController.create);
  routes.get('/', CarController.getAll);
  routes.get('/:id', idValidation, CarController.get);
  routes.put('/:id', idValidation, createValidation, CarController.update);
  routes.patch(
    '/:idVeiculo/acessorios/:idAcessorio',
    idAcessorioValidation,
    acessoriosValidation,
    CarController.updateAcessorio
  );
  routes.delete('/:id', idValidation, CarController.delete);
  server.use(prefix, authMid, routes, errors);
};
