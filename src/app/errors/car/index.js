const CarParameterNotFound = require('./CarParameterNotFound')
const CarIdNotFound = require('./CarIdNotFound')
const ModeloUniqueError = require('./ModeloUniqueError')
const IdFormatError = require('../car/IdFormatError')
const AcessorioUniqueError = require('../car/AcessorioUniqueError')
const CarAcessorioIdNotFound = require('../car/CarAcessorioIdNotFound')
const CarAcessorioWillBecomeEmpty = require('../car/CarAcessorioWillBecomeEmpty')
const CarIdAndAcessorioIdNotMatch = require('../car/CarIdAndAcessorioIdNotMatch')

module.exports = async(error, req, res, next) => {
    var statusCode = 500

    if (error instanceof CarParameterNotFound ||
        error instanceof CarIdNotFound ||
        error instanceof CarIdAndAcessorioIdNotMatch ||
        error instanceof CarAcessorioIdNotFound) {
        statusCode = 404
    }

    if (error instanceof ModeloUniqueError ||
        error instanceof IdFormatError ||
        error instanceof CarAcessorioWillBecomeEmpty ||
        error instanceof AcessorioUniqueError
    ) {
        statusCode = 400
    }

    res.status(statusCode).send({
        description: error.name,
        name: error.message
    })

}