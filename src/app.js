const express = require('express')
const router = require('./routes')
const PeopleErrors = require('./app/errors/people/index')
const CarErrors = require('./app/errors/car/index')
require('./infra/database/mongo')

class App {

    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(PeopleErrors)
        this.server.use(CarErrors)
    }

    routes() {
        router(this.server)
    }

}

module.exports = new App().server