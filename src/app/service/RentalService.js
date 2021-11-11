const RentalRepository = require('../repository/RentalRepository');
const BadRequest = require('../errors/BadRequest');

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

  formatEndereco(payload) {
    Object.keys(payload).forEach((element) => {
      if (
        element === 'cep' ||
        element === 'logradouro' ||
        element === 'bairro' ||
        element === 'number' ||
        element === 'localidade' ||
        element === 'uf' ||
        element === 'isFilial'
      ) {
        const valueOfElement = payload[element];
        delete payload[element];
        const newElement = `endereco.${element}`;
        const newKeyValue = {
          [newElement]: valueOfElement
        };
        Object.assign(payload, newKeyValue);
      }
    });
  }

  async create(payload) {
    this.checkIsFilial(payload);
    this.checkEndereco(payload);
    const locadora = await RentalRepository.create(payload);
    return locadora;
  }

  async getById(payload) {
    const locadora = await RentalRepository.getById(payload);
    return locadora;
  }

  async getAll(payload) {
    this.formatEndereco(payload);
    const locadoras = await RentalRepository.getAll(payload);
    return locadoras;
  }

  async delete(id) {
    await RentalRepository.delete(id);
  }

  async update(id, payload) {
    this.checkIsFilial(payload);
    this.checkEndereco(payload);
    return RentalRepository.update(id, payload);
  }
}

module.exports = new RentalService();
