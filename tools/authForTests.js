const jwt = require('jsonwebtoken');
const authConfig = require('../src/config/config');
const PeopleSchema = require('../src/app/schema/PeopleSchema');

class Jwt {
  async sign(payload) {
    return jwt.sign(payload, authConfig.database.secret, { expiresIn: 86400 });
  }

  async getToken() {
    await PeopleSchema.create({
      nome: 'Tio Pedro',
      cpf: '853.361.818-20',
      data_nascimento: '2001-05-15',
      email: 'tiopedro@email.com',
      senha: 'senhadotiopedro',
      habilitado: 'sim'
    });
    const payload = { email: 'tiopedro@email.com', habilitado: 'sim' };

    return jwt.sign(payload, authConfig.database.secret, { expiresIn: 86400 });
  }
}

module.exports = new Jwt();
