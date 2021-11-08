const CarController = require('../app/controller/CarController')
const createValidation = require('../app/validation/car/create')
const idValidation = require('../app/validation/car/id')
const acessoriosValidation = require('../app/validation/car/acessorios')
const errors = require('../app/errors/car/index')
const authMiddleware = require('../app/authentication/auth')


module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', authMiddleware, createValidation, errors, CarController.create, errors)
    routes.get('/', authMiddleware, CarController.listQuery, errors)
    routes.get('/:id', authMiddleware, idValidation, errors, CarController.findOneById, errors)
    routes.put('/:id', authMiddleware, idValidation, errors, createValidation, errors, CarController.updateById, errors)
    routes.patch('/:id/acessorios/:id_acessorio', authMiddleware, acessoriosValidation, CarController.updateAcessorioById, errors)
    routes.delete('/:id', authMiddleware, idValidation, errors, CarController.deleteOne, errors)
    server.use(prefix, routes)
}