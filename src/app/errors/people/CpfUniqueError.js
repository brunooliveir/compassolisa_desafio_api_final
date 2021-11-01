class CpfUniqueError extends Error {
    constructor(cpfValue) {
        const message = 'CPF ' + cpfValue + ' already in use'
        super(message)
        this.name = 'Conflict'
        this.idError = 0
    }

}

module.exports = CpfUniqueError