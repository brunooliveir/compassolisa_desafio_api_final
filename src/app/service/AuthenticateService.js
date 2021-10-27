const PeopleRepository = require('../repository/PeopleRepository')
const Jwt = require('../authentication/jwt')
const PeopleParameterNotFound = require('../errors/people/PeopleParameterNotFound')


class AuthenticateService {
    async authenticate(payload) {
        const finded = await PeopleRepository.findByQuery(payload)
        if (finded.length == 0) {
            throw new PeopleParameterNotFound()
        }
        const result = await PeopleRepository.create(finded[0])
        const STATUS_SUCCESS = 201
        const token = await Jwt.sign({ email: result["email"] })
        const pessoa = { token: token, email: result["email"], habilitado: result["habilitado"] }
        return { statusCode: STATUS_SUCCESS, pessoa: pessoa }

    }

}

module.exports = new AuthenticateService()