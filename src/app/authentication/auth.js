const jwt = require('jsonwebtoken')
const authConfig = require('../../config/config')
const NoTokenProvided = require('../errors/car/NoTokenProvided')
const TokenError = require('../errors/car/TokenError')
const TokenMalformatted = require('../errors/car/TokenMalformatted')
const TokenInvalid = require('../errors/car/TokenInvalid')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new NoTokenProvided()
    }

    const parts = authHeader.split(' ')

    if (!parts.lenght === 2) {
        throw new TokenError(authHeader)
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        throw new TokenMalformatted(authHeader)
    }

    jwt.verify(token, authConfig.database.secret, (error, decoded) => {
        if (error) {
            throw new TokenInvalid(authHeader)
        }

        req.email = decoded.email
        return next()
    })

}