class NoTokenProvided extends Error {
    constructor() {
        const message = `No token provided`
        super(message)
        this.name = 'Unauthorized'
    }
}

module.exports = NoTokenProvided