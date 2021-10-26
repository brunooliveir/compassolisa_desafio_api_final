class NotFound extends Error {
    constructor() {
        super('Error: car id not found')
        this.name = 'NotFound'
        this.idError = 0
    }

}

module.exports = NotFound