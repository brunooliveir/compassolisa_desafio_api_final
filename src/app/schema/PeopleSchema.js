const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

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
        unique: true
    },
    senha: {
        type: String,
        required: true
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