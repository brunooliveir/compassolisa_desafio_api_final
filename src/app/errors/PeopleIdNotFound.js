class PeopleIdNotFound extends Error {
    constructor() {
        super('Error: people id not found')
        this.name = 'PeopleIdNotFound'
        this.idError = 1
    }
}

module.exports = PeopleIdNotFound