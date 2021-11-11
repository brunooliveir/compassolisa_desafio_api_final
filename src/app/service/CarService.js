const CarRepository = require('../repository/CarRepository');
const Conflict = require('../errors/Conflict');

class CarService {
  formatDescricao(payload) {
    Object.keys(payload).forEach((element) => {
      if (element === 'descricao') {
        const newKeyValue = { 'acessorios.descricao': payload.descricao };
        delete payload.descricao;
        Object.assign(payload, newKeyValue);
      }
    });
  }

  checkAcessorios(idAcessorio, acessorios, descricao) {
    if (acessorios.length === 1) return;
    const listAcessorios = [];
    acessorios.forEach((element) => {
      if (element._id.toString() === idAcessorio) listAcessorios.push(descricao.trim().toLowerCase());
      else listAcessorios.push(element.descricao.trim().toLowerCase());
    });
    const newAcessorios = listAcessorios.filter((element, index, array) => array.indexOf(element) === index);
    if (newAcessorios.length < listAcessorios.length) throw new Conflict(`descricao ${descricao}`);
  }

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
    this.formatDescricao(payload);
    const veiculos = await CarRepository.getAll(payload);
    return veiculos;
  }

  async delete(id) {
    await CarRepository.delete(id);
  }

  async update(id, payload) {
    return CarRepository.update(id, payload);
  }

  async patchCar(veiculo, idVeiculo, idAcessorio, payload) {
    this.checkAcessorios(idAcessorio, veiculo.acessorios, payload.descricao);
    return CarRepository.updateAcessorio(idVeiculo, idAcessorio, payload);
  }
}

module.exports = new CarService();
