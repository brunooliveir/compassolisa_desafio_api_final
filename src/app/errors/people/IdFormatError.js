class IdFormatError extends Error {
    constructor(Id) {
        const message = 'Format of this ObjectId: ' + Id + ' is not valid'
        super(message)
        this.name = 'Bad Request'
        this.idError = 7
    }
}

module.exports = IdFormatError