class CpfUniqueError extends Error {
    constructor() {
        const message = 'Error: invalid CPF, CPF already registered'
        super(message)
        this.name = 'CpfUniqueError'
        this.idError = 3
    }

}

module.exports = CpfUniqueError