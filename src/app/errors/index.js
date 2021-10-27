const PeopleParameterNotFound = require('./PeopleParameterNotFound')
const NotAutenticate = require('./NotAutenticate')
const PeopleIdNotFound = require('./PeopleIdNotFound')


module.exports = async(error, req, res, next) => {
    var statusCode = 500

    if (error instanceof PeopleParameterNotFound || error instanceof PeopleIdNotFound) {
        statusCode = 404
    }

    if (error instanceof NotAutenticate) {
        statusCode = 400
    }

    res.status(statusCode).send(JSON.stringify({ message: error.message, Error_Id: error.idError }))


}