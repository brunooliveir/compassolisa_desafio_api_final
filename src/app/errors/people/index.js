const PeopleParameterNotFound = require('./PeopleParameterNotFound')
const NotAutenticate = require('./NotAutenticate')
const PeopleIdNotFound = require('./PeopleIdNotFound')
const CpfError = require('./CpfError')
const IdadeError = require('./IdadeError')
const EmailUniqueError = require('./EmailUniqueError')
const CpfUniqueError = require('./CpfUniqueError')

module.exports = async(error, req, res, next) => {
    var statusCode = 500

    if (error instanceof PeopleParameterNotFound ||
        error instanceof PeopleIdNotFound) {
        statusCode = 404
    }

    if (error instanceof NotAutenticate ||
        error instanceof CpfError ||
        error instanceof IdadeError ||
        error instanceof EmailUniqueError ||
        error instanceof CpfUniqueError
    ) {
        statusCode = 400
    }

    res.status(statusCode).send(JSON.stringify({ message: error.message, Error_Id: error.idError }))


}