const axios = require('axios');
const Repository = require('./Repository');
const RentalSchema = require('../schema/RentalSchema');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

class RentalRepository extends Repository {
  constructor() {
    super(RentalSchema);
  }

  async findCep(payload) {
    const address = [];
    payload.endereco.forEach((endereco) => {
      address.push(axios.get(`https://viacep.com.br/ws/${endereco.cep}/json`));
    });
    const addresses = await Promise.all(address);
    return addresses;
  }

  createFullEndereco(payload, addresses) {
    const fullAddresses = [];
    payload.endereco.forEach((endereco, index) => {
      if (addresses[index].data.erro) throw new BadRequest(endereco.cep);
      if (endereco.complemento === undefined) {
        endereco.complemento = addresses[index].data.complemento;
      }
      fullAddresses.push({
        cep: endereco.cep,
        logradouro: addresses[index].data.logradouro,
        complemento: endereco.complemento,
        bairro: addresses[index].data.bairro,
        number: endereco.number,
        localidade: addresses[index].data.localidade,
        uf: addresses[index].data.uf,
        isFilial: endereco.isFilial
      });
    });
    Object.assign(payload, { endereco: fullAddresses });
  }

  async create(payload) {
    const addresses = await this.findCep(payload);
    this.createFullEndereco(payload, addresses);
    return RentalSchema.create(payload);
  }

  async update(id, payload) {
    const addresses = await this.findCep(payload);
    this.createFullEndereco(payload, addresses);
    const finded = await RentalSchema.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false });
    if (finded == null) {
      throw new NotFound(`id ${id}`);
    }
    return finded;
  }
}

module.exports = new RentalRepository();
