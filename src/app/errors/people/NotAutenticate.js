class NotAutenticate extends Error {
    constructor() {
        const message = 'Error: email and password not match'
        super(message)
        this.name = 'NotAutenticate'
        this.idError = 4
    }

}

module.exports = NotAutenticate