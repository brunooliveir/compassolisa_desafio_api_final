class CnpjBadValue extends Error {
    constructor(cnpjValue) {
        const message = `Invalid CNPJ ${cnpjValue}`
        super(message)
        this.name = 'Bad Request'
    }

}

module.exports = CnpjBadValue