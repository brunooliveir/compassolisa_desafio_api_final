class AcessorioUniqueError extends Error {
    constructor(acessorio) {
        const message = `Acessorio ${acessorio} already in use`
        super(message)
        this.name = 'Bad Request'
    }
}

module.exports = AcessorioUniqueError