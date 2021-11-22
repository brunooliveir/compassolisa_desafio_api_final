const Repository = require('./Repository');
const CarSchema = require('../schema/CarSchema');

class CarRepository extends Repository {
  constructor() {
    super(CarSchema);
  }

  async updateAcessorio(idVeiculo, idAcessorio, payload) {
    const finded = await CarSchema.findOneAndUpdate(
      { 'acessorios._id': idAcessorio, _id: idVeiculo },
      { $set: { 'acessorios.$.descricao': payload.descricao } },
      { returnOriginal: false, safe: true, upsert: true }
    );
    return finded;
  }
}

module.exports = new CarRepository();
