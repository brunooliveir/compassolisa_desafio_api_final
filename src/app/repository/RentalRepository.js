const axios = require('axios');
const RentalSchema = require('../schema/RentalSchema');
const CepInvalidError = require('../errors/rental/CepInvalidError');
const LocadoraIdNotFound = require('../errors/rental/LocadoraIdNotFound');

class RentalRepository {
  async create(payload) {
    const address = [];
    payload.endereco.forEach((endereco) => {
      address.push(axios.get(`https://viacep.com.br/ws/${endereco.cep}/json`));
    });
    const addresses = await Promise.all(address);
    const fullAddresses = [];
    payload.endereco.forEach((endereco, index) => {
      if (addresses[index].data.erro) {
        throw new CepInvalidError(endereco.cep);
      }
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
    return RentalSchema.create(payload);
  }

  async findByQuery(payload) {
    return RentalSchema.find(payload)
      .limit(payload.limit)
      .sort({
        created_at: 'asc'
      })
      .skip(payload.skip);
  }

  async findOneById(payload) {
    const finded = await RentalSchema.findById({ _id: payload });
    if (finded == null) {
      throw new LocadoraIdNotFound(payload);
    }
    return finded;
  }

  async deleteOne(payload) {
    const finded = await RentalSchema.findById({ _id: payload });
    if (finded == null) {
      throw new LocadoraIdNotFound(payload);
    }
    return RentalSchema.deleteOne({ _id: payload });
  }

  async UpdateOneById(id, payload) {
    const address = [];
    payload.endereco.forEach((endereco) => {
      address.push(axios.get(`https://viacep.com.br/ws/${endereco.cep}/json`));
    });
    const addresses = await Promise.all(address);
    const fullAddresses = [];
    payload.endereco.forEach((endereco, index) => {
      if (addresses[index].data.erro) {
        throw new CepInvalidError(endereco.cep);
      }
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
    const finded = await RentalSchema.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false });
    if (finded == null) {
      throw new LocadoraIdNotFound(id);
    }
    return finded;
  }
}

module.exports = new RentalRepository();
