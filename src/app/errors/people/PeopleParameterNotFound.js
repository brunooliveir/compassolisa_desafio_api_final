class PeopleParameterNotFound extends Error {
    constructor() {
        const message = 'Error: the people with these parameters was not found'
        super(message)
        this.name = 'PeopleParameterNotFound'
        this.idError = 5
    }

}

module.exports = PeopleParameterNotFound