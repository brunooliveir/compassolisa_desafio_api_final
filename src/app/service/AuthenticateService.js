const PeopleRepository = require('../repository/PeopleRepository')
const Jwt = require('../authentication/jwt')

class AuthenticateService {
    async authenticate(payload) {
        try {
            const finded = await PeopleRepository.findByQuery(payload)
            if (finded.length == 0) {
                throw new Error('the people with these parameters was not found')
            }
            const result = await PeopleRepository.create(finded[0])
            const STATUS_SUCCESS = 201
            const token = await Jwt.sign({ email: result["email"] })
            const pessoa = { token: token, email: result["email"], habilitado: result["habilitado"] }
            return { statusCode: STATUS_SUCCESS, pessoa: pessoa }

        } catch (Error) {
            const STATUS_FAIL = 400
            return { statusCode: STATUS_FAIL, pessoa: { Error: 'the people with these parameters was not found' } }
        }
    }

}

module.exports = new AuthenticateService()