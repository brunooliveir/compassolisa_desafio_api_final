const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RentalSchema = mongoose.Schema(
  {
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
    endereco: [
      {
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
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

RentalSchema.plugin(mongoosePaginate);
const Rental = mongoose.model('locadoras', RentalSchema);

module.exports = Rental;
