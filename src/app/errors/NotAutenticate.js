class NotAutenticate extends Error {
    constructor() {
        const message = 'Error: invalid email or password'
        super(message)
        this.name = 'NotAutenticate'
        this.idError = 0
    }

}

module.exports = NotAutenticate