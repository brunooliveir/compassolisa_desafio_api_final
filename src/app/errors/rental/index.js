const CepInvalidError = require('./CepInvalidError');
const CepFormatError = require('./CepFormatError');
const CnpjBadValue = require('./CnpjBadValue');
const CnpjUniqueError = require('./CnpjUniqueError');
const NomeUniqueError = require('./NomeUniqueError');
const MatrizLargerThanOneError = require('./MatrizLargerThanOneError');
const IdFormatError = require('./IdFormatError');
const LocadoraIdNotFound = require('./LocadoraIdNotFound');
const RentalParameterNotFound = require('./RentalParameterNotFound');
const AddressDuplicatedError = require('./AddressDuplicatedError');

module.exports = async (error, req, res, next) => {
  let statusCode = 500;

  if (error.response !== undefined) {
    if (error.response.status === 400 && error.response.statusText === 'Bad Request') {
      const cepError = new CepFormatError();
      return res.status(400).json({
        description: cepError.name,
        name: cepError.message
      });
    }
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'nome') {
    const nomeError = new NomeUniqueError(error.keyValue.nome);
    return res.status(409).json({
      description: nomeError.name,
      name: nomeError.message
    });
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'cnpj') {
    const cnpjError = new CnpjUniqueError(error.keyValue.cnpj);
    return res.status(409).json({
      description: cnpjError.name,
      name: cnpjError.message
    });
  }

  if (
    error.name.toString() === 'CastError' &&
    (Object.keys(error.value).toString() === '_id' || error.path.toString() === '_id')
  ) {
    if (error.value._id === undefined) {
      const idError = new IdFormatError(error.value);
      return res.status(400).json({
        description: idError.name,
        name: idError.message
      });
    }
    const idError = new IdFormatError(error.value._id);
    return res.status(400).json({
      description: idError.name,
      name: idError.message
    });
  }

  if (error instanceof CnpjUniqueError || error instanceof NomeUniqueError) {
    statusCode = 409;
  }

  if (error instanceof LocadoraIdNotFound || error instanceof RentalParameterNotFound) {
    statusCode = 404;
  }

  if (
    error instanceof CepInvalidError ||
    error instanceof IdFormatError ||
    error instanceof CnpjBadValue ||
    error instanceof MatrizLargerThanOneError ||
    error instanceof AddressDuplicatedError
  ) {
    statusCode = 400;
  }

  if (error === undefined) {
    return next();
  }

  return res.status(statusCode).json({
    description: error.name,
    name: error.message
  });
};
