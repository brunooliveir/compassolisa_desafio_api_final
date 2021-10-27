const CarController = require('../app/controller/CarController')
const createValidation = require('../app/validation/car/create')
const updateValidation = require('../app/validation/car/update')
const idValidation = require('../app/validation/car/id')
const errors = require('../app/errors/car/index')


module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', createValidation, errors, CarController.create, errors)
    routes.get('/', CarController.listQuery, errors)
    routes.get('/:id', idValidation, CarController.findOneById, errors)
    routes.put('/:id', idValidation, updateValidation, errors, CarController.updateById, errors)
    routes.delete('/:id', idValidation, CarController.deleteOne, errors)
    server.use(prefix, routes)
}