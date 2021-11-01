class NotAutenticate extends Error {
    constructor(email) {
        const message = 'Email ' + email + ' and password not match'
        super(message)
        this.name = 'Bad Request'
        this.idError = 4
    }

}

module.exports = NotAutenticate