const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');

module.exports = async (error, req, res, next) => {
  let status = 500;
  let description = 'Server error';

  if (
    error instanceof NotFound ||
    error instanceof BadRequest ||
    error instanceof Conflict ||
    error instanceof Unauthorized
  ) {
    status = error.status;
    description = error.description;
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'cpf') {
    const cpfError = new Conflict(`cpf ${error.keyValue.cpf}`);
    return res.status(409).json({
      description: cpfError.description,
      name: cpfError.message
    });
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'email') {
    const emailError = new Conflict(`email ${error.keyValue.email}`);
    return res.status(409).json({
      description: emailError.description,
      name: emailError.message
    });
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'modelo') {
    const modeloError = new Conflict(`modelo ${error.keyValue.modelo}`);
    return res.status(409).json({
      description: modeloError.description,
      name: modeloError.message
    });
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'nome') {
    const nomeError = new Conflict(`nome ${error.keyValue.nome}`);
    return res.status(409).json({
      description: nomeError.description,
      name: nomeError.message
    });
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'cnpj') {
    const cnpjError = new Conflict(`cnpj ${error.keyValue.cnpj}`);
    return res.status(409).json({
      description: cnpjError.description,
      name: cnpjError.message
    });
  }

  if (
    error.name.toString() === 'CastError' &&
    (Object.keys(error.value).toString() === '_id' || error.path.toString() === '_id')
  ) {
    if (error.value._id === undefined) {
      const idError = new BadRequest(`id ${error.value}`);
      return res.status(400).json({
        description: idError.description,
        name: idError.message
      });
    }
    const idError = new BadRequest(`id ${error.value._id}`);
    return res.status(400).json({
      description: idError.description,
      name: idError.message
    });
  }

  if (error === undefined) {
    return next();
  }

  return res.status(status).json({
    description,
    name: error.message
  });
};
