class NotAutenticate extends Error {
    constructor(email) {
        const message = 'Email ' + email + ' and password not match'
        super(message)
        this.name = 'Bad Request'
    }

}

module.exports = NotAutenticate