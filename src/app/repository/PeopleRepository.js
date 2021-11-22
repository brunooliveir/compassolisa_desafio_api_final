const Repository = require('./Repository');
const PeopleSchema = require('../schema/PeopleSchema');
const BadRequest = require('../errors/BadRequest');

class PeopleRepository extends Repository {
  constructor() {
    super(PeopleSchema);
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
}

module.exports = new PeopleRepository();
