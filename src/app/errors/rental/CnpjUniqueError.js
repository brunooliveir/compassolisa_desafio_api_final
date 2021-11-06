class CnpjUniqueError extends Error {
    constructor(cnpjValue) {
        const message = `CNPJ ${cnpjValue} already in use`
        super(message)
        this.name = 'Conflict'
    }

}

module.exports = CnpjUniqueError