const CarController = require('../app/controller/CarController')
const createValidation = require('../app/validation/car/create')
const idValidation = require('../app/validation/car/id')
const acessoriosValidation = require('../app/validation/car/acessorios')
const errors = require('../app/errors/car/index')


module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', createValidation, errors, CarController.create, errors)
    routes.get('/', CarController.listQuery, errors)
    routes.get('/:id', idValidation, errors, CarController.findOneById, errors)
    routes.put('/:id', idValidation, errors, createValidation, errors, CarController.updateById, errors)
    routes.patch('/:id/acessorios/:id_acessorio', acessoriosValidation, CarController.updateAcessorioById, errors)
    routes.delete('/:id', idValidation, errors, CarController.deleteOne, errors)
    server.use(prefix, routes)
}