const PeopleRepository = require('../repository/PeopleRepository');
const Jwt = require('../middlewares/jwt');

class AuthenticateService {
  async authenticate(payload) {
    const finded = await PeopleRepository.getOne(payload);
    const token = await Jwt.sign({ email: finded.email, habilitado: finded.habilitado });
    const pessoa = { token, email: finded.email, habilitado: finded.habilitado };
    return pessoa;
  }
}

module.exports = new AuthenticateService();
