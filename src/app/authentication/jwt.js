const jwt = require('jsonwebtoken')

class Jwt {
    async sign(payload) {
        const secret = 'dDsInG6cflShbGci0iJIUz6DS245a2sds3DS4FS'
        return jwt.sign(payload, secret)
    }
    async verify(token) {
        const secret = 'dDsInG6cflShbGci0iJIUz6DS245a2sds3DS4FS'
        return jwt.verify(token, secret)
    }
}

module.exports = new Jwt