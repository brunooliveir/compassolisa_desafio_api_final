const PeopleSchema = require('../schema/PeopleSchema');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

class PeopleRepository {
  async create(payload) {
    return PeopleSchema.create(payload);
  }

  async getAll(payload) {
    if (payload.limit) payload.limit = parseInt(payload.limit, 10);
    if (payload.offset) payload.skip = parseInt(payload.offset, 10);
    if (payload.offsets && payload.offset) payload.skip += parseInt(payload.offsets, 10);
    if (payload.offsets) payload.skip = parseInt(payload.offsets, 10);
    const pessoas = await PeopleSchema.find(payload)
      .limit(payload.limit)
      .sort({ created_at: 'asc' })
      .skip(payload.skip);
    const total = await PeopleSchema.countDocuments(payload);
    if (total === 0) throw new NotFound('of query');
    return {
      pessoas,
      total,
      limit: payload.limit,
      offset: payload.offset,
      offsets: payload.offsets
    };
  }

  async getById(payload) {
    const finded = await PeopleSchema.findById({ _id: payload });
    if (finded == null) {
      throw new NotFound(`id ${payload}`);
    }
    return finded;
  }

  async getOne(payload) {
    const finded = await PeopleSchema.findOne({
      email: payload.email,
      senha: payload.senha
    });
    if (finded == null) {
      throw new BadRequest(`email or password`);
    }
    return finded;
  }

  async update(id, payload) {
    const finded = await PeopleSchema.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false });
    if (finded == null) {
      throw new NotFound(`id ${id}`);
    }
    return finded;
  }

  async delete(payload) {
    const finded = await PeopleSchema.findById({ _id: payload });
    if (finded == null) {
      throw new NotFound(payload);
    }
    return PeopleSchema.deleteOne({ _id: payload });
  }
}

module.exports = new PeopleRepository();
