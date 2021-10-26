const AuthenticateService = require('../service/AuthenticateService')

class AuthenticateController {
    async authenticate(req, res) {
        const result = await AuthenticateService.authenticate(req.body)
        return res.status(result["statusCode"]).send(result["pessoa"])
    }
}

module.exports = new AuthenticateController()