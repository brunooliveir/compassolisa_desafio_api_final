const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RentalFleetSchema = mongoose.Schema(
  {
    id_carro: {
      type: String,
      required: true
    },
    id_locadora: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['disponivel', 'alugado'],
      required: true
    },
    valor_diaria: {
      type: String,
      required: true
    },
    placa: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

RentalFleetSchema.plugin(mongoosePaginate);
const RentalFleet = mongoose.model('frotas', RentalFleetSchema);

module.exports = RentalFleet;
