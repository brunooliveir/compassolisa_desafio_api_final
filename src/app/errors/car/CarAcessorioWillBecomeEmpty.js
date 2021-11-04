class CarAcessorioWillBecomeEmpty extends Error {
    constructor() {
        const message = 'Acessorio list of car not can become empty'
        super(message)
        this.name = 'Bad Request'
    }
}

module.exports = CarAcessorioWillBecomeEmpty