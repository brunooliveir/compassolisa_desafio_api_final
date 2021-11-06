const mongoose = require('mongoose')

const RentalSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    cnpj: {
        type: String,
        required: true,
        unique: true
    },
    atividades: {
        type: String,
        required: true
    },
    endereco: {
        type: Array,
        required: true,
        of: {
            cep: {
                type: String,
                required: true
            },
            logradouro: {
                type: String,
                required: true
            },
            complemento: {
                type: String,
                required: false
            },
            bairro: {
                type: String,
                required: false
            },
            number: {
                type: String,
                required: true
            },
            localidade: {
                type: String,
                required: false
            },
            uf: {
                type: String,
                required: false
            },
            isFilial: {
                type: Boolean,
                required: true
            }
        }
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})


RentalSchema.methods.toJSON = function() {
    const obj = this.toObject()
    obj.endereco.forEach(element => {
        delete element._id
    })
    delete obj.created_at
    delete obj.updated_at
    delete obj.__v
    return obj
}

const Rental = mongoose.model('locadoras', RentalSchema)

module.exports = Rental