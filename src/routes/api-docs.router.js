const swaggerUi = require("swagger-ui-express")
const swaggerFile = require('../../docs/swagger.json')

module.exports = (server, routes, prefix = '/api/v1') => {
    routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
    server.use(prefix, routes)
}