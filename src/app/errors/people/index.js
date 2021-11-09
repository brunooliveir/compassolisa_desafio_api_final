const PeopleParameterNotFound = require('./PeopleParameterNotFound');
const NotAutenticate = require('./NotAutenticate');
const PeopleIdNotFound = require('./PeopleIdNotFound');
const IdadeError = require('./IdadeError');
const EmailUniqueError = require('./EmailUniqueError');
const CpfUniqueError = require('./CpfUniqueError');
const IdFormatError = require('./IdFormatError');
const CpfBadValue = require('./CpfBadValue');

module.exports = async (error, req, res, next) => {
  let statusCode = 500;

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'cpf') {
    const cpfError = new CpfUniqueError(error.keyValue.cpf);
    return res.status(409).json({
      description: cpfError.name,
      name: cpfError.message
    });
  }

  if (parseInt(error.code, 10) === 11000 && Object.keys(error.keyValue).toString() === 'email') {
    const emailError = new EmailUniqueError(error.keyValue.email);
    return res.status(409).json({
      description: emailError.name,
      name: emailError.message
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

  if (error instanceof CpfUniqueError || error instanceof EmailUniqueError) {
    statusCode = 409;
  }

  if (error instanceof PeopleParameterNotFound || error instanceof PeopleIdNotFound) {
    statusCode = 404;
  }

  if (
    error instanceof NotAutenticate ||
    error instanceof IdadeError ||
    error instanceof IdFormatError ||
    error instanceof CpfBadValue
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
