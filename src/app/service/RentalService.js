const RentalRepository = require('../repository/RentalRepository');
const MatrizLargerThanOneError = require('../errors/rental/MatrizLargerThanOneError');
const AddressDuplicatedError = require('../errors/rental/AddressDuplicatedError');
const RentalParameterNotFound = require('../errors/rental/RentalParameterNotFound');

class RentalService {
  async create(payload) {
    let matrizDeclared = 0;
    payload.endereco.forEach((element) => {
      if (!element.isFilial) {
        matrizDeclared += 1;
      }
    });
    if (matrizDeclared > 1) {
      throw new MatrizLargerThanOneError(matrizDeclared);
    }
    if (payload.endereco.length > 1) {
      const addresses = [];
      payload.endereco.forEach((element) => {
        addresses.push(element.cep.trim().replace('-', '') + element.number.trim().toLowerCase());
      });
      const newPayload = addresses.filter((element, index, array) => array.indexOf(element) === index);
      if (newPayload.length < addresses.length) {
        throw new AddressDuplicatedError();
      }
    }
    const locadora = await RentalRepository.create(payload);
    return locadora;
  }

  async checkLocadoraId(payload) {
    const locadora = await RentalRepository.findOneById(payload);
    return locadora;
  }

  async checkQuery(payload) {
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

    if (payload.limit) {
      payload.limit = parseInt(payload.limit, 10);
    }
    if (payload.offset) {
      payload.offset = parseInt(payload.offset, 10);
      payload.skip = payload.offset;
    }
    if (payload.offsets) {
      payload.offsets = parseInt(payload.offsets, 10);
      if (payload.skip) {
        payload.skip += payload.offsets;
      } else {
        payload.skip = payload.offsets;
      }
    }
    const locadoras = await RentalRepository.findByQuery(payload);
    const { limit, offset, offsets, skip, ...locadorasWithOutPagination } = payload;
    const locadorasTotal = (await RentalRepository.findByQuery(locadorasWithOutPagination)).length;
    if (locadorasTotal === 0) {
      throw new RentalParameterNotFound(payload);
    }
    return {
      locadoras,
      total: locadorasTotal,
      limit: payload.limit,
      offset: payload.offset,
      offsets: payload.offsets
    };
  }

  async checkLocadoraDelete(id) {
    await RentalRepository.deleteOne(id);
  }

  async checkLocadoraUpdate(id, payload) {
    let matrizDeclared = 0;
    payload.endereco.forEach((element) => {
      if (!element.isFilial) {
        matrizDeclared += 1;
      }
    });
    if (matrizDeclared > 1) {
      throw new MatrizLargerThanOneError(matrizDeclared);
    }
    if (payload.endereco.length > 1) {
      const addresses = [];
      payload.endereco.forEach((element) => {
        addresses.push(element.cep.trim() + element.number.trim());
      });
      const newPayload = addresses.filter((element, index, array) => array.indexOf(element) === index);
      if (newPayload.length < addresses.length) {
        throw new AddressDuplicatedError();
      }
    }
    return RentalRepository.UpdateOneById(id, payload);
  }
}

module.exports = new RentalService();
