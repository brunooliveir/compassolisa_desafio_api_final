const mongoose = require('mongoose')
const config = require('../../../config/config.json')

const optionsSchema = {
    autoIndex: true
}

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        return mongoose.connect(`mongodb://${config.database.host}/${config.database.collection}`, optionsSchema)
    }
}

module.exports = new Database().connect()