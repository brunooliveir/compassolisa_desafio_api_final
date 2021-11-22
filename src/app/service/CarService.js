const CarRepository = require('../repository/CarRepository');

class CarService {
  async create(payload) {
    const veiculo = await CarRepository.create(payload);
    return veiculo;
  }

  async getById(payload) {
    const veiculo = await CarRepository.getById(payload);
    return veiculo;
  }

  async getByIds(idVeiculo, idAcessorio) {
    const veiculo = await CarRepository.getByIds(idVeiculo, idAcessorio);
    return veiculo;
  }

  async getAll(payload) {
    const veiculos = await CarRepository.getAll(payload);
    return veiculos;
  }

  async delete(id) {
    await CarRepository.delete(id);
  }

  async update(id, payload) {
    return CarRepository.update(id, payload);
  }

  async patchCar(idVeiculo, idAcessorio, payload) {
    return CarRepository.updateAcessorio(idVeiculo, idAcessorio, payload);
  }
}

module.exports = new CarService();
