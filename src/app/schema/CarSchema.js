const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CarSchema = mongoose.Schema(
  {
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
      required: true,
      min: 1949,
      max: 2023
    },
    acessorios: [
      {
        descricao: {
          type: String,
          required: true
        }
      }
    ],
    quantidadePassageiros: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

CarSchema.plugin(mongoosePaginate);
const Car = mongoose.model('veiculos', CarSchema);

module.exports = Car;
