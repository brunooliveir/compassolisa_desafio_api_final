const CarSchema = require('../schema/CarSchema');
const NotFound = require('../errors/NotFound');

class CarRepository {
  async create(payload) {
    return CarSchema.create(payload);
  }

  async getAll(payload) {
    if (payload.limit) payload.limit = parseInt(payload.limit, 10);
    if (payload.offset) payload.skip = parseInt(payload.offset, 10);
    if (payload.offsets && payload.offset) payload.skip += parseInt(payload.offsets, 10);
    if (payload.offsets) payload.skip = parseInt(payload.offsets, 10);
    const veiculos = await CarSchema.find(payload).limit(payload.limit).sort({ created_at: 'asc' }).skip(payload.skip);
    const total = await CarSchema.countDocuments(payload);
    if (total === 0) throw new NotFound('of query');
    return {
      veiculos,
      total,
      limit: payload.limit,
      offset: payload.offset,
      offsets: payload.offsets
    };
  }

  async getById(payload) {
    const finded = await CarSchema.findById({ _id: payload });
    if (finded == null) throw new NotFound(`id ${payload}`);
    return finded;
  }

  async getByIds(idVeiculo, idAcessorio) {
    const finded = await CarSchema.findOne({ 'acessorios._id': idAcessorio, _id: idVeiculo });
    if (finded == null) throw new NotFound(`id of acessorio ${idAcessorio} in veiculo with id ${idVeiculo}`);
    return finded;
  }

  async update(id, payload) {
    const finded = await CarSchema.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false });
    if (finded == null) throw new NotFound(`id ${id}`);
    return finded;
  }

  async delete(payload) {
    const finded = await CarSchema.findById({ _id: payload });
    if (finded == null) throw new NotFound(`id ${payload}`);
    return CarSchema.deleteOne({ _id: payload });
  }

  async updateAcessorio(idVeiculo, idAcessorio, payload) {
    const finded = await CarSchema.findOneAndUpdate(
      { 'acessorios._id': idAcessorio, _id: idVeiculo },
      { $set: { 'acessorios.$.descricao': payload.descricao } },
      { returnOriginal: false, safe: true, upsert: true }
    );
    if (!finded) throw new NotFound(`id ${idVeiculo}`);
    return finded;
  }
}

module.exports = new CarRepository();
