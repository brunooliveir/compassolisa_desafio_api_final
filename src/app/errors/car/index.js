const CarParameterNotFound = require('./CarParameterNotFound')
const CarIdNotFound = require('./CarIdNotFound')
const ModeloUniqueError = require('./ModeloUniqueError')
const IdFormatError = require('../car/IdFormatError')

module.exports = async(error, req, res, next) => {
    var statusCode = 500

    if (error instanceof CarParameterNotFound ||
        error instanceof CarIdNotFound) {
        statusCode = 404
    }

    if (error instanceof ModeloUniqueError || error instanceof IdFormatError) {
        statusCode = 400
    }

    res.status(statusCode).send({
        description: error.name,
        name: error.message
    })

}