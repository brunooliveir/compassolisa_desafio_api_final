const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');

const RentalReserveSchema = mongoose.Schema(
  {
    id_user: {
      type: String,
      required: true
    },
    data_inicio: {
      type: Date,
      required: true,
      transform: (val) => moment(val).format('DD/MM/YYYY')
    },
    data_fim: {
      type: Date,
      required: true,
      transform: (val) => moment(val).format('DD/MM/YYYY')
    },
    id_carro: {
      type: String,
      required: true
    },
    id_locadora: {
      type: String,
      required: true
    },
    valor_final: {
      type: String,
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

RentalReserveSchema.plugin(mongoosePaginate);
const RentalReserve = mongoose.model('reservas', RentalReserveSchema);

module.exports = RentalReserve;
