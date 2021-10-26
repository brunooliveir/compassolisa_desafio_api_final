const AuthenticateController = require('../app/controller/AuthenticateController')
const errors = require('../app/errors/index')


module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
    routes.post('/', AuthenticateController.authenticate)
    server.use(prefix, routes)
}