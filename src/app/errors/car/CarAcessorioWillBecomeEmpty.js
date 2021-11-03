class CarAcessorioWillBecomeEmpty extends Error {
    constructor() {
        const message = 'Acessorio list of car will become empty'
        super(message)
        this.name = 'Bad Request'
    }
}

module.exports = CarAcessorioWillBecomeEmpty