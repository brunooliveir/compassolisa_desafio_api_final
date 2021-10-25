const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const carSchema = mongoose.Schema({
    modelo: {
        type: String,
        required: true,
        unique: true
    },
    cor: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    acessorios: {
        type: Array,
        required: true,
        of: {
            descricao: {
                type: String,
                required: true
            }
        }
    },
    quantidadePassageiros: {
        type: Number,
        required: true
    }
})

autoIncrement.initialize(mongoose.connection)
carSchema.plugin(autoIncrement.plugin, 'idCar')


const Car = mongoose.model('veiculos', carSchema)

module.exports = Car