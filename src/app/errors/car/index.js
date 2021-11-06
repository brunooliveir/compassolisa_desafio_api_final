const CarParameterNotFound = require('./CarParameterNotFound')
const CarIdNotFound = require('./CarIdNotFound')
const ModeloUniqueError = require('./ModeloUniqueError')
const IdFormatError = require('../car/IdFormatError')
const AcessorioUniqueError = require('../car/AcessorioUniqueError')
const CarAcessorioIdNotFound = require('../car/CarAcessorioIdNotFound')
const CarAcessorioWillBecomeEmpty = require('../car/CarAcessorioWillBecomeEmpty')
const CarIdAndAcessorioIdNotMatch = require('../car/CarIdAndAcessorioIdNotMatch')

module.exports = async(error, req, res, next) => {
    let statusCode = 500

    if (error.codeName == 'DuplicateKey' && Object.keys(error.keyValue) == 'modelo') {
        error = new ModeloUniqueError(error.keyValue.modelo)
    }

    if (error.code == 11000 && Object.keys(error.keyValue) == 'modelo') {
        error = new ModeloUniqueError(error.keyValue.modelo)
    }

    if (error.name == 'CastError' && (Object.keys(error.value) == '_id' || error.path == '_id')) {
        if (error.value._id == undefined) {
            error = new IdFormatError(error.value)
        } else {
            error = new IdFormatError(error.value._id)
        }
    }

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