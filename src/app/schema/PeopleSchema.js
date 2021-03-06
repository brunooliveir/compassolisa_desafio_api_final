const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const crypto = require('crypto');
const moment = require('moment');

const PeopleSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    data_nascimento: {
      type: Date,
      required: true,
      transform: (val) => moment(val).format('DD/MM/YYYY')
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
      set: (value) => crypto.createHash('md5').update(value).digest('hex')
    },
    habilitado: {
      type: String,
      enum: ['sim', 'não'],
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

PeopleSchema.plugin(mongoosePaginate);
const People = mongoose.model('pessoas', PeopleSchema);

module.exports = People;
