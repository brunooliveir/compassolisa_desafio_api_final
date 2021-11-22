const RentalRepository = require('../repository/RentalRepository');
const BadRequest = require('../errors/BadRequest');
const CnpjChecker = require('../utils/cnpj');

class RentalService {
  checkIsFilial(payload) {
    if (payload.endereco.length === 1) return;
    let matrizDeclared = 0;
    payload.endereco.forEach((element) => {
      if (!element.isFilial) matrizDeclared += 1;
    });
    if (matrizDeclared > 1) throw new BadRequest('more than one isFilial false');
  }

  checkEndereco(payload) {
    if (payload.endereco.length === 1) return;
    const addresses = [];
    payload.endereco.forEach((element) => {
      addresses.push(element.cep.trim().replace('-', '') + element.number.trim().toLowerCase());
    });
    const newPayload = addresses.filter((element, index, array) => array.indexOf(element) === index);
    if (newPayload.length < addresses.length) throw new BadRequest('duplicate endereco');
  }

  async create(payload) {
    this.checkIsFilial(payload);
    this.checkEndereco(payload);
    await CnpjChecker(payload.cnpj);
    const locadora = await RentalRepository.create(payload);
    return locadora;
  }

  async getById(payload) {
    const locadora = await RentalRepository.getById(payload);
    return locadora;
  }

  async getAll(payload) {
    const locadoras = await RentalRepository.getAll(payload);
    return locadoras;
  }

  async delete(id) {
    await RentalRepository.delete(id);
  }

  async update(id, payload) {
    this.checkIsFilial(payload);
    this.checkEndereco(payload);
    await CnpjChecker(payload.cnpj);
    return RentalRepository.update(id, payload);
  }
}

module.exports = new RentalService();
