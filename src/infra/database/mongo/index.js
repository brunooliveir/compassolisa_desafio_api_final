const mongoose = require('mongoose')

// const optionsSchema = {
//     carCreateIndex = true,
//     carFindAndModify: false
// }


class Database {
    constructor() {
        this.connect()
    }

    connect() {
        return mongoose.connect('mongodb://localhost:27017/autoRental')
    }
}

module.exports = new Database().connect()