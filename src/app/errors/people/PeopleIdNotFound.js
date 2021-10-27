class PeopleIdNotFound extends Error {
    constructor() {
        const message = 'Error: people id not found'
        super(message)
        this.name = 'PeopleIdNotFound'
        this.idError = 1
    }
}

module.exports = PeopleIdNotFound