const CarParameterNotFound = require('./CarParameterNotFound');
const CarIdNotFound = require('./CarIdNotFound');
const ModeloUniqueError = require('./ModeloUniqueError');
const IdFormatError = require('./IdFormatError');
const AcessorioUniqueError = require('./AcessorioUniqueError');
const CarAcessorioIdNotFound = require('./CarAcessorioIdNotFound');
const CarAcessorioWillBecomeEmpty = require('./CarAcessorioWillBecomeEmpty');
const CarIdAndAcessorioIdNotMatch = require('./CarIdAndAcessorioIdNotMatch');
const NoTokenProvided = require('./NoTokenProvided');
const TokenError = require('./TokenError');
const TokenMalformatted = require('./TokenMalformatted');
const TokenInvalid = require('./TokenInvalid');

module.exports = async (error, req, res, next) => {
  let statusCode = 500;

  if (error.codeName === 'DuplicateKey' && Object.keys(error.keyValue) === 'modelo') {
    const modeloError = new ModeloUniqueError(error.keyValue.modelo);
    return res.status(409).json({
      description: modeloError.name,
      name: modeloError.message
    });
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'modelo') {
    const modeloError = new ModeloUniqueError(error.keyValue.modelo);
    return res.status(409).json({
      description: modeloError.name,
      name: modeloError.message
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

  if (error instanceof ModeloUniqueError || error instanceof AcessorioUniqueError) {
    statusCode = 409;
  }

  if (
    error instanceof NoTokenProvided ||
    error instanceof TokenError ||
    error instanceof TokenMalformatted ||
    error instanceof TokenInvalid
  ) {
    statusCode = 401;
  }

  if (
    error instanceof CarParameterNotFound ||
    error instanceof CarIdNotFound ||
    error instanceof CarIdAndAcessorioIdNotMatch ||
    error instanceof CarAcessorioIdNotFound
  ) {
    statusCode = 404;
  }

  if (error instanceof IdFormatError || error instanceof CarAcessorioWillBecomeEmpty) {
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
