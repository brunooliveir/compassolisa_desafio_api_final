class CarAcessorioIdNotFound extends Error {
    constructor(Id) {
        const message = 'Acessorio of car with id ' + Id + ' not found'
        super(message)
        this.name = 'Not Found'
    }
}

module.exports = CarAcessorioIdNotFound