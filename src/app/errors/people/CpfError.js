class CpfError extends Error {
    constructor() {
        const message = 'Error: invalid CPF'
        super(message)
        this.name = 'CpfError'
        this.idError = 2
    }

}

module.exports = CpfError