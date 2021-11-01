class EmailUniqueError extends Error {
    constructor(emailValue) {
        const message = 'Email ' + emailValue + ' already in use'
        super(message)
        this.name = 'Conflict'
        this.idError = 1
    }

}

module.exports = EmailUniqueError