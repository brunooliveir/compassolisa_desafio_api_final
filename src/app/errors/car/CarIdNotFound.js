class CarIdNotFound extends Error {
    constructor() {
        const message = 'Error: car id not found'
        super(message)
        this.name = 'CarIdNotFound'
        this.idError = 1
    }
}

module.exports = CarIdNotFound