class CarIdNotFound extends Error {
    constructor(Id) {
        const message = 'Car with id ' + Id + ' not found'
        super(message)
        this.name = 'Not Found'
    }
}

module.exports = CarIdNotFound