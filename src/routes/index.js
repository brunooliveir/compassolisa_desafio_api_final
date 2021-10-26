const { Router } = require('express')
const car = require('../routes/car.router')
const people = require('../routes/people.router')
const authenticate = require('../routes/authenticate.router')

module.exports = server => {
    server.use((req, res, next) => {
        car(server, new Router())
        people(server, new Router())
        authenticate(server, new Router())
        next()
    })
}