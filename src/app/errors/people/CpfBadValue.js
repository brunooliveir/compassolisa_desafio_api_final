class CpfBadValue extends Error {
    constructor(cpfValue) {
        const message = `Invalid CPF ${cpfValue}`
        super(message)
        this.name = 'Bad Request'
    }

}

module.exports = CpfBadValue