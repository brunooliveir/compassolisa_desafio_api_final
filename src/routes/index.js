const { Router } = require('express')
const car = require('../routes/car.router')
const people = require('../routes/people.router')

module.exports = server => {
    server.use((req, res, next) => {
        car(server, new Router())
        people(server, new Router())
        next()
    })
}