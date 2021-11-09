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
