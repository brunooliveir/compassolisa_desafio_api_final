const mongoose = require('mongoose')

const optionsSchema = {
    autoIndex: true
}


class Database {
    constructor() {
        this.connect()
    }

    connect() {
        return mongoose.connect('mongodb://localhost:27017/compassolisa', optionsSchema)
    }
}

module.exports = new Database().connect()