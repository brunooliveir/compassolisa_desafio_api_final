const moment = require('moment');
const RentalReserveRepository = require('../repository/RentalReserveRepository');

class RentalReserveService {
  formatData(payload) {
    payload.data_inicio = moment(payload.data_inicio, 'DD/MM/YYYY').format('MM/DD/YYYY');
    payload.data_fim = moment(payload.data_fim, 'DD/MM/YYYY').format('MM/DD/YYYY');
    return payload;
  }

  async create(idLocadora, payload) {
    const newPayload = this.formatData(payload);
    const reserva = await RentalReserveRepository.create(idLocadora, newPayload);
    return reserva;
  }

  async getById(payload) {
    const reserva = await RentalReserveRepository.getById(payload);
    return reserva;
  }

  async getAll(payload) {
    const reservas = await RentalReserveRepository.getAll(payload);
    return reservas;
  }

  async delete(id) {
    await RentalReserveRepository.delete(id);
  }

  async update(id, payload) {
    return RentalReserveRepository.update(id, payload);
  }
}

module.exports = new RentalReserveService();
