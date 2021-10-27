class PeopleParameterNotFound extends Error {
    constructor() {
        super('Error: the people with these parameters was not found')
        this.name = 'PeopleParameterNotFound'
        this.idError = 0
    }

}

module.exports = PeopleParameterNotFound