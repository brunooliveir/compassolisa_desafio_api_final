const PeopleParameterNotFound = require('./PeopleParameterNotFound')
const NotAutenticate = require('./NotAutenticate')
const PeopleIdNotFound = require('./PeopleIdNotFound')
const IdadeError = require('./IdadeError')
const EmailUniqueError = require('./EmailUniqueError')
const CpfUniqueError = require('./CpfUniqueError')
const IdFormatError = require('./IdFormatError')
const CpfBadValue = require('./CpfBadValue')

module.exports = async(error, req, res, next) => {
    let statusCode = 500

    if (error.code == 11000 && Object.keys(error.keyValue) == 'cpf') {
        error = new CpfUniqueError(error.keyValue.cpf)
    }

    if (error.code == 11000 && Object.keys(error.keyValue) == 'email') {
        error = new EmailUniqueError(error.keyValue.email)
    }

    if (error.name == 'CastError' && Object.keys(error.value) == '_id') {
        error = new IdFormatError(error.value._id)
    }

    if (error instanceof PeopleParameterNotFound ||
        error instanceof PeopleIdNotFound) {
        statusCode = 404
    }

    if (error instanceof NotAutenticate ||
        error instanceof IdadeError ||
        error instanceof EmailUniqueError ||
        error instanceof CpfUniqueError ||
        error instanceof IdFormatError ||
        error instanceof CpfBadValue
    ) {
        statusCode = 400
    }

    res.status(statusCode).send({
        description: error.name,
        name: error.message
    })


}