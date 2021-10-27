const AuthenticateController = require('../app/controller/AuthenticateController')
const errors = require('../app/errors/people/index')


module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
    routes.post('/', AuthenticateController.authenticate, errors)
    server.use(prefix, routes)
}