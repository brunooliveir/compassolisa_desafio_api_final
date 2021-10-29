const mongoose = require('mongoose')
const crypto = require('crypto')
const moment = require('moment')

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
        required: true,
        transform: (val) => moment(val).format("DD/MM/YYYY")
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
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

peopleSchema.methods.toJSON = function() {
    const obj = this.toObject()
    delete obj.senha
    delete obj.created_at
    delete obj.updated_at
    delete obj.__v
    return obj
}


const People = mongoose.model('pessoas', peopleSchema)

module.exports = People