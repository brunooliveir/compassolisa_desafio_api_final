class IdadeError extends Error {
    constructor() {
        const message = 'Error: invalid data_nascimento field, age less than 18 years'
        super(message)
        this.name = 'IdadeError'
        this.idError = 3
    }

}

module.exports = IdadeError