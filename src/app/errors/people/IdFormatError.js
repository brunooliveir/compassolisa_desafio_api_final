class IdFormatError extends Error {
    constructor() {
        const message = 'Error: Format of this parameter ObjectId is not valid'
        super(message)
        this.name = 'IdFormatError'
        this.idError = 7
    }
}

module.exports = IdFormatError