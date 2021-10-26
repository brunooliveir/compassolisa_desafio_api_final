const PeopleController = require('../app/controller/PeopleController')
const createValidation = require('../app/validation/people/create')
const updateValidation = require('../app/validation/people/update')
const idValidation = require('../app/validation/people/id')
const errors = require('../app/errors/index')


module.exports = (server, routes, prefix = '/api/v1/people') => {
    routes.post('/', createValidation, PeopleController.create)
    routes.get('/', PeopleController.listQuery)
    routes.get('/:id', idValidation, PeopleController.findOneById)
    routes.put('/:id', updateValidation, idValidation, PeopleController.updateById)
    routes.delete('/:id', idValidation, PeopleController.deleteOne)
    server.use(prefix, routes)
}