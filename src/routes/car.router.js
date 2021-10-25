const CarController = require('../app/controller/CarController')
const createValidation = require('../app/validation/car/create')
const updateValidation = require('../app/validation/car/update')
const idValidation = require('../app/validation/car/id')


module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', createValidation, CarController.create)
    routes.get('/', CarController.listQuery)
    routes.get('/:id', idValidation, CarController.findOneById)
    routes.put('/:id', idValidation, updateValidation, CarController.updateById)
    routes.delete('/:id', idValidation, CarController.deleteOne)
    server.use(prefix, routes)
}