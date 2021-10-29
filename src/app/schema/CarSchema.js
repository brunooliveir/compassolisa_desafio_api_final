const mongoose = require('mongoose')

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
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

carSchema.methods.toJSON = function() {
    const obj = this.toObject()
    delete obj.acessorios[0]._id
    delete obj.created_at
    delete obj.updated_at
    delete obj.__v
    return obj
}



const Car = mongoose.model('veiculos', carSchema)

module.exports = Car