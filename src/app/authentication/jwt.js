const jwt = require('jsonwebtoken');
const authConfig = require('../../config/config');

class Jwt {
  async sign(payload) {
    return jwt.sign(payload, authConfig.database.secret, { expiresIn: 86400 });
  }
}

module.exports = new Jwt();
