class ModeloUniqueError extends Error {
    constructor() {
        const message = 'Error: invalid Modelo, Modelo already registered'
        super(message)
        this.name = 'ModeloUniqueError'
        this.idError = 2
    }

}

module.exports = ModeloUniqueError