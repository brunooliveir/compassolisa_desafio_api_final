const AuthenticateService = require('../service/AuthenticateService')

class AuthenticateController {
    async authenticate(req, res, next) {
        try {
            const result = await AuthenticateService.authenticate(req.body)
            return res.status(201).send(result)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new AuthenticateController()