const axios = require('axios');
const RentalSchema = require('../schema/RentalSchema');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

class RentalRepository {
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

  async getAll(payload) {
    if (payload.limit) payload.limit = parseInt(payload.limit, 10);
    if (payload.offset) payload.skip = parseInt(payload.offset, 10);
    if (payload.offsets && payload.offset) payload.skip += parseInt(payload.offsets, 10);
    if (payload.offsets) payload.skip = parseInt(payload.offsets, 10);
    const locadoras = await RentalSchema.find(payload)
      .limit(payload.limit)
      .sort({ created_at: 'asc' })
      .skip(payload.skip);
    const total = await RentalSchema.countDocuments(payload);
    if (total === 0) throw new NotFound('of query');
    return {
      locadoras,
      total,
      limit: payload.limit,
      offset: payload.offset,
      offsets: payload.offsets
    };
  }

  async getById(payload) {
    const finded = await RentalSchema.findById({ _id: payload });
    if (finded == null) {
      throw new NotFound(`id ${payload}`);
    }
    return finded;
  }

  async delete(payload) {
    const finded = await RentalSchema.findById({ _id: payload });
    if (finded == null) {
      throw new NotFound(`id ${payload}`);
    }
    return RentalSchema.deleteOne({ _id: payload });
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
