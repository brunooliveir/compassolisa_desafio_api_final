const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    modelo: {
        type: String,
        require: true
    },
    cor: {
        type: String,
        require: true
    },
    ano: {
        type: Number,
        require: true
    },
    acessorios: {
        type: Array,
        require: true,
        of: {
            descricao: {
                type: String,
                require: true
            }
        }
    },
    quantidadePassageiros: {
        type: Number,
        require: true
    }
})

const Car = mongoose.model('car', carSchema)

module.exports = Car