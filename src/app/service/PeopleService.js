const PeopleRepository = require('../repository/PeopleRepository')
const Jwt = require('../authentication/jwt')

class PeopleService {
    async create(payload) {
        try {
            const result = await PeopleRepository.create(payload)
            const { senha, ...pessoa } = result.toObject()
            const STATUS_SUCCESS = 201
            return { statusCode: STATUS_SUCCESS, pessoa: pessoa }
        } catch (error) {
            const STATUS_FAIL = 400
            return { statusCode: STATUS_FAIL, pessoa: { error } }
        }
    }

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


    async checkPessoaId(id) {
        try {
            const pessoa = await PeopleRepository.findOneById(id)
            const STATUS_SUCCESS = 200
            if (pessoa == null) {
                throw new Error('people id not found')
            }
            return { statusCode: STATUS_SUCCESS, pessoa: pessoa }

        } catch (Error) {
            const STATUS_FAIL = 404

            return { statusCode: STATUS_FAIL, pessoa: { Error: 'people id not found' } }

        }
    }

    async checkQuery(query) {
        try {
            const LIMIT = 100
            const OFFSET = 0
            const OFFSETS = 0
            const pessoas = await PeopleRepository.findByQuery(query, LIMIT, OFFSET, OFFSETS)
            const STATUS_SUCCESS = 200
            if (pessoas.length == 0) {
                throw new Error('the people with these parameters was not found')
            }
            return { statusCode: STATUS_SUCCESS, pessoas: pessoas, total: pessoas.length, limit: LIMIT, offset: OFFSET, offsets: OFFSETS }
        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, pessoas: { Error: 'the people with these parameters was not found' } }

        }
    }

    async checkPessoaDelete(id, checkedPessoaId) {
        try {
            const STATUS_SUCCESS = 204
            if (checkedPessoaId["statusCode"] == 404) {
                throw new Error('people id not found')
            }
            await PeopleRepository.deleteOne(id)
            return { statusCode: STATUS_SUCCESS, }
        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, pessoa: { Error: 'people id not found' } }
        }
    }

    async checkPessoaUpdate(id, payload, checkedPessoaId) {
        try {

            if (checkedPessoaId["statusCode"] == 404) {
                throw new Error('people id not found')
            }

        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, pessoa: { Error: 'people id not found' } }
        }
        try {
            const STATUS_SUCCESS = 201
            const pessoa = await PeopleRepository.findOneById(id)
            Object.keys(payload).forEach(element => {
                if (pessoa[element] == undefined) {
                    throw new Error('parameter not found')
                }
            })
            Object.assign(pessoa, payload)
            pessoa.save()
            return { statusCode: STATUS_SUCCESS, pessoa: { pessoa } }
        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, pessoa: { Error: 'parameter not found' } }
        }
    }


}

module.exports = new PeopleService()