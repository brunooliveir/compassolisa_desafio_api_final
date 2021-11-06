const RentalController = require('../app/controller/RentalController')
const createValidation = require('../app/validation/rental/create')
const idValidation = require('../app/validation/rental/id')
const errors = require('../app/errors/rental/index')

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/', createValidation, RentalController.create, errors)
    routes.get('/', RentalController.listQuery, errors)
    routes.get('/:id', idValidation, errors, RentalController.findOneById, errors)
    routes.put('/:id', idValidation, errors, createValidation, errors, RentalController.updateById, errors)
    routes.delete('/:id', idValidation, errors, RentalController.deleteOne, errors)
    server.use(prefix, routes)
}