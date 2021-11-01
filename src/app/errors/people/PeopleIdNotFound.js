class PeopleIdNotFound extends Error {
    constructor(Id) {
        const message = 'People with id ' + Id + ' not found'
        super(message)
        this.name = 'Not Found'
        this.idError = 6
    }
}

module.exports = PeopleIdNotFound