const CarParameterNotFound = require('./CarParameterNotFound')
const CarIdNotFound = require('./CarIdNotFound')
const ModeloUniqueError = require('./ModeloUniqueError')

module.exports = async(error, req, res, next) => {
    var statusCode = 500

    if (error instanceof CarParameterNotFound ||
        error instanceof CarIdNotFound) {
        statusCode = 404
    }

    if (error instanceof ModeloUniqueError) {
        statusCode = 400
    }

    res.status(statusCode).send(JSON.stringify({ message: error.message, Error_Id: error.idError }))


}