class CarParameterNotFound extends Error {
    constructor() {
        const message = 'Error: the car with these parameters was not found'
        super(message)
        this.name = 'CarParameterNotFound'
        this.idError = 0
    }

}

module.exports = CarParameterNotFound