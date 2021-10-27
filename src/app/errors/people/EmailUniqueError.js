class EmailUniqueError extends Error {
    constructor() {
        const message = 'Error: invalid Email, Email already registered'
        super(message)
        this.name = 'EmailUniqueError'
        this.idError = 4
    }

}

module.exports = EmailUniqueError