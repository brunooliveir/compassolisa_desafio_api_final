const CepInvalidError = require('./CepInvalidError')

module.exports = async(error, req, res, next) => {
    let statusCode = 500

    if (error instanceof CepInvalidError) {
        statusCode = 400
    }

    res.status(statusCode).send({
        description: error.name,
        name: error.message
    })

}