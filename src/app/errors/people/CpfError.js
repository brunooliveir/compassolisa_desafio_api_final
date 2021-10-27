class CpfError extends Error {
    constructor() {
        const message = 'Error: invalid CPF'
        super(message)
        this.name = 'CpfError'
        this.idError = 1
    }

}

module.exports = CpfError