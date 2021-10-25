const CarController = require('../app/controller/CarController')
const createValidation = require('../app/validation/car/create')
const queryValidation = require('../app/validation/car/query')


module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', createValidation, CarController.create)
    routes.get('/', CarController.listAll)
    routes.get('/:id', queryValidation, CarController.findOneById)
    routes.delete('/:id', CarController.deleteOne)
    server.use(prefix, routes)
}