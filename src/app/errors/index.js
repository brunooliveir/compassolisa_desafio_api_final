const NotFound = require('./NotFound')
const NotAutenticate = require('./NotAutenticate')


module.exports = async(req, res, error) => {

    console.log('a')
    var statusCode = 500

    if (error instanceof NotFound) {
        statusCode = 404
    }

    if (error instanceof NotAutenticate) {
        statusCode = 400
    }





    result = { statusCode: statusCode, pessoa: JSON.stringify(error.message) }
    res.status(result["statusCode"]).send(result["pessoa"])


}