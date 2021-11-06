class IdFormatError extends Error {
    constructor(Id) {
        const message = `Format of this ObjectId: ${Id} is not valid`
        super(message)
        this.name = 'Bad Request'
    }
}

module.exports = IdFormatError