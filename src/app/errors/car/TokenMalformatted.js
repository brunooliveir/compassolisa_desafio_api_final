class TokenMalformatted extends Error {
    constructor(token) {
        const message = `Token bad format: ${token}`
        super(message)
        this.name = 'Unauthorized'
    }
}

module.exports = TokenMalformatted