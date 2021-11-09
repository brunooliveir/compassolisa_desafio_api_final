const PeopleRepository = require('../repository/PeopleRepository');
const Jwt = require('../authentication/jwt');
const NotAutenticate = require('../errors/people/NotAutenticate');

class AuthenticateService {
  async authenticate(payload) {
    const finded = await PeopleRepository.findByQuery(payload);
    if (finded.length === 0) {
      throw new NotAutenticate(payload.email);
    }
    const result = await PeopleRepository.create(finded[0]);
    const token = await Jwt.sign({ email: result.email, habilitado: result.habilitado });
    const pessoa = { token, email: result.email, habilitado: result.habilitado };
    return pessoa;
  }
}

module.exports = new AuthenticateService();
