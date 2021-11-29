const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');
const Conflict = require('../errors/Conflict');

module.exports = async (error, req, res, next) => {
  let status = 500;
  let description = 'Server internal error';

  if (
    error instanceof NotFound ||
    error instanceof BadRequest ||
    error instanceof Conflict ||
    error instanceof Unauthorized
  ) {
    status = error.status;
    description = error.description;
  }

  if (parseInt(error.code, 10) === 2 && error.codeName.toString() === 'BadValue') {
    const idsError = new NotFound(`id of acessorio in veiculo with this id`);
    return res.status(404).json({
      description: idsError.name,
      name: idsError.message
    });
  }

  if (
    parseInt(error.code, 10) === 11000 &&
    ['cpf', 'email', 'modelo', 'cnpj', 'nome', 'placa'].includes(Object.keys(error.keyValue).toString())
  ) {
    const conflictError = new Conflict(
      `${Object.keys(error.keyValue).toString()} ${error.keyValue[Object.keys(error.keyValue).toString()]}`
    );
    return res.status(409).json({
      description: conflictError.name,
      name: conflictError.message
    });
  }

  if (
    error.name.toString() === 'CastError' &&
    (Object.keys(error.value).toString() === '_id' || error.path.toString() === '_id')
  ) {
    if (error.value._id === undefined) {
      const idError = new BadRequest(error.value);
      return res.status(400).json({
        description: idError.name,
        name: idError.message
      });
    }
    const idError = new BadRequest(error.value._id);
    return res.status(400).json({
      description: idError.name,
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
