const jwt = require('jsonwebtoken');
const authConfig = require('../../config/config');

const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Unauthorized('No token provided');
  }

  const parts = authHeader.split(' ');

  if (!parts.lenght === 2) {
    throw new Unauthorized('Token error');
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new Unauthorized('Token mal formatted');
  }

  jwt.verify(token, authConfig.database.secret, (error, decoded) => {
    if (error) {
      throw new Unauthorized('Invalid token');
    }

    req.email = decoded.email;
    return next();
  });
};
