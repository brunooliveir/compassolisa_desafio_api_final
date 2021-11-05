const RentalController = require('../app/controller/RentalController')
const createValidation = require('../app/validation/rental/create')
const errors = require('../app/errors/rental/index')


module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/', createValidation, RentalController.create, errors)
    routes.get('/', RentalController.listQuery, errors)
        // routes.get('/:id', idValidation, errors, CarController.findOneById, errors)
        // routes.put('/:id', idValidation, errors, createValidation, errors, CarController.updateById, errors)
        // routes.delete('/:id', idValidation, errors, CarController.deleteOne, errors)
    server.use(prefix, routes)
}