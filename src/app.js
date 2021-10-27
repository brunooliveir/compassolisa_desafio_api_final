const express = require('express')
const router = require('./routes')
const PoplesErrors = require('./app/errors/people/index')
require('./infra/database/mongo')

class App {

    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(PoplesErrors)
    }

    routes() {
        router(this.server)
    }

}

module.exports = new App().server