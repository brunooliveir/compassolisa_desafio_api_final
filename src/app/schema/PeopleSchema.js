const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const crypto = require('crypto')

const peopleSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    senha: {
        type: String,
        select: false,
        required: true,
        set: value => crypto
            .createHash('md5')
            .update(value)
            .digest('hex')
    },
    habilitado: {
        type: String,
        enum: ['sim', 'não'],
        required: true
    }
})

autoIncrement.initialize(mongoose.connection)
peopleSchema.plugin(autoIncrement.plugin, 'idPeople')


const People = mongoose.model('pessoas', peopleSchema)

module.exports = People