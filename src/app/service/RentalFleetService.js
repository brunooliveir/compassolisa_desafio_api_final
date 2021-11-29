const RentalFleetRepository = require('../repository/RentalFleetRepository');

class RentalFleetService {
  async create(idLocadora, payload) {
    const reserva = await RentalFleetRepository.create(idLocadora, payload);
    return reserva;
  }

  async getById(payload) {
    const reserva = await RentalFleetRepository.getById(payload);
    return reserva;
  }

  async getAll(payload) {
    const reservas = await RentalFleetRepository.getAll(payload);
    return reservas;
  }

  async delete(id) {
    await RentalFleetRepository.delete(id);
  }

  async update(id, payload) {
    return RentalFleetRepository.update(id, payload);
  }
}

module.exports = new RentalFleetService();
