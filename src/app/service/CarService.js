const CarRepository = require('../repository/CarRepository');
const CarParameterNotFound = require('../errors/car/CarParameterNotFound');
const AcessorioUniqueError = require('../errors/car/AcessorioUniqueError');
const CarAcessorioWillBecomeEmpty = require('../errors/car/CarAcessorioWillBecomeEmpty');
const CarIdAndAcessorioIdNotMatch = require('../errors/car/CarIdAndAcessorioIdNotMatch');

class CarService {
  async create(payload) {
    const veiculo = await CarRepository.create(payload);
    return veiculo;
  }

  async checkVeiculoId(payload) {
    const veiculo = await CarRepository.findOneById(payload);
    return veiculo;
  }

  async checkQuery(payload) {
    Object.keys(payload).forEach((element) => {
      if (element === 'descricao') {
        const newKeyValue = { 'acessorios.descricao': payload.descricao };
        delete payload.descricao;
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
    const veiculos = await CarRepository.findByQuery(payload);
    const { limit, offset, offsets, skip, ...veiculosWithOutPagination } = payload;
    const veiculosTotal = (await CarRepository.findByQuery(veiculosWithOutPagination)).length;
    if (veiculosTotal === 0) {
      throw new CarParameterNotFound(payload);
    }
    return {
      veiculos,
      total: veiculosTotal,
      limit: payload.limit,
      offset: payload.offset,
      offsets: payload.offsets
    };
  }

  async checkVeiculoDelete(id) {
    await CarRepository.deleteOne(id);
  }

  async checkVeiculoUpdate(id, payload) {
    return CarRepository.UpdateOneById(id, payload);
  }

  async checkAcessoriosUpdate(veiculo, id_acessorio, payload) {
    let isForUpdate = null;
    const veiculoFoundByAcessorioId = await CarRepository.findOneByAcessorioId(id_acessorio);
    const acessoriosLenght = veiculoFoundByAcessorioId.acessorios.length;
    if (veiculo._id.toString() !== veiculoFoundByAcessorioId.id.toString()) {
      throw new CarIdAndAcessorioIdNotMatch(veiculo._id, id_acessorio);
    }
    veiculoFoundByAcessorioId.acessorios.forEach((element) => {
      if (
        element._id.toString() === id_acessorio.toString() &&
        element.descricao.toString() === payload.descricao.toString()
      ) {
        if (acessoriosLenght === 1) {
          throw new CarAcessorioWillBecomeEmpty();
        }
        isForUpdate = false;
      }
      if (
        element._id.toString() !== id_acessorio.toString() &&
        element.descricao.trim().toLowerCase() === payload.descricao.trim().toLowerCase()
      ) {
        throw new AcessorioUniqueError(element.descricao);
      }
      if (
        element._id.toString() === id_acessorio.toString() &&
        element.descricao.toString() !== payload.descricao.toString()
      ) {
        isForUpdate = true;
      }
    });
    veiculoFoundByAcessorioId.acessorios.forEach((element, index) => {
      if (element._id.toString() === id_acessorio.toString() && isForUpdate) {
        element.descricao = payload.descricao;
      }
      if (element._id.toString() === id_acessorio.toString() && !isForUpdate) {
        veiculoFoundByAcessorioId.acessorios[index].remove();
      }
    });
    return CarRepository.UpdateAcessorioById(id_acessorio, veiculoFoundByAcessorioId.acessorios);
  }
}

module.exports = new CarService();
