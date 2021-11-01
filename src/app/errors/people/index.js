const PeopleParameterNotFound = require('./PeopleParameterNotFound')
const NotAutenticate = require('./NotAutenticate')
const PeopleIdNotFound = require('./PeopleIdNotFound')
const IdadeError = require('./IdadeError')
const EmailUniqueError = require('./EmailUniqueError')
const CpfUniqueError = require('./CpfUniqueError')
const IdFormatError = require('./IdFormatError')
const CpfBadValue = require('./CpfBadValue')

module.exports = async(error, req, res, next) => {
    var statusCode = 500

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