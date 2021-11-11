const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
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

const Car = mongoose.model('veiculos', carSchema);

module.exports = Car;
