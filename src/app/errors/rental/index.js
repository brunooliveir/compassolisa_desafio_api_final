const CepInvalidError = require('./CepInvalidError')
const CnpjBadValue = require('./CnpjBadValue')
const CnpjUniqueError = require('./CnpjUniqueError')
const NomeUniqueError = require('./NomeUniqueError')
const MatrizLargerThanOneError = require('./MatrizLargerThanOneError')
const IdFormatError = require('./IdFormatError')
const LocadoraIdNotFound = require('./LocadoraIdNotFound')
const RentalParameterNotFound = require('./RentalParameterNotFound')


module.exports = async(error, req, res, next) => {
    let statusCode = 500

    if (error.code == 11000 && Object.keys(error.keyValue) == 'nome') {
        error = new NomeUniqueError(error.keyValue.nome)
    }

    if (error.code == 11000 && Object.keys(error.keyValue) == 'cnpj') {
        error = new CnpjUniqueError(error.keyValue.cnpj)
    }

    if (error.name == 'CastError' && (Object.keys(error.value) == '_id' || error.path == '_id')) {
        if (error.value._id == undefined) {
            error = new IdFormatError(error.value)
        } else {
            error = new IdFormatError(error.value._id)
        }
    }

    if (error instanceof LocadoraIdNotFound ||
        error instanceof RentalParameterNotFound) {
        statusCode = 404
    }

    if (error instanceof NomeUniqueError ||
        error instanceof CepInvalidError ||
        error instanceof CnpjUniqueError ||
        error instanceof MatrizLargerThanOneError ||
        error instanceof IdFormatError ||
        error instanceof CnpjBadValue) {
        statusCode = 400
    }

    res.status(statusCode).send({
        description: error.name,
        name: error.message
    })

}