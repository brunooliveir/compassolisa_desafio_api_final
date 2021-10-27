const PeopleRepository = require('../repository/PeopleRepository')
const PeopleParameterNotFound = require('../errors/PeopleParameterNotFound')
const PeopleIdNotFound = require('../errors/PeopleIdNotFound')


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

    async checkPessoaId(id) {
        const pessoa = await PeopleRepository.findOneById(id)
        const STATUS_SUCCESS = 200
        if (pessoa == null) {
            throw new PeopleIdNotFound()
        }
        return { statusCode: STATUS_SUCCESS, pessoa: pessoa }
    }

    async checkQuery(query) {
        const LIMIT = 100
        const OFFSET = 0
        const OFFSETS = 0
        const pessoas = await PeopleRepository.findByQuery(query, LIMIT, OFFSET, OFFSETS)
        const STATUS_SUCCESS = 200
        if (pessoas.length == 0) {
            throw new PeopleParameterNotFound()
        }
        return { statusCode: STATUS_SUCCESS, pessoas: pessoas, total: pessoas.length, limit: LIMIT, offset: OFFSET, offsets: OFFSETS }
    }

    async checkPessoaDelete(id, checkedPessoaId) {
        const STATUS_SUCCESS = 204
        if (checkedPessoaId["statusCode"] == 404) {
            throw new PeopleIdNotFound()
        }
        await PeopleRepository.deleteOne(id)
        return { statusCode: STATUS_SUCCESS, }

    }

    async checkPessoaUpdate(id, payload, checkedPessoaId) {
        if (checkedPessoaId["statusCode"] == 404) {
            throw new PeopleIdNotFound()
        }
        const STATUS_SUCCESS = 201
        const pessoa = await PeopleRepository.findOneById(id)
        Object.keys(payload).forEach(element => {
            if (pessoa[element] == undefined) {
                throw new PeopleParameterNotFound()
            }
        })
        Object.assign(pessoa, payload)
        pessoa.save()
        return { statusCode: STATUS_SUCCESS, pessoa: { pessoa } }
    }
}

module.exports = new PeopleService()