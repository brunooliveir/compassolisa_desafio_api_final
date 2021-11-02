const { Router } = require('express')
const car = require('../routes/car.router')
const people = require('../routes/people.router')
const authenticate = require('../routes/authenticate.router')
const apidocs = require('../routes/api-docs.router')

module.exports = server => {
    server.use((req, res, next) => {
        apidocs(server, new Router())
        car(server, new Router())
        people(server, new Router())
        authenticate(server, new Router())
        next()
    })
}