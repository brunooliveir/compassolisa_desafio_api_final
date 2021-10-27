const PeopleRepository = require('../repository/PeopleRepository')
const PeopleParameterNotFound = require('../errors/people/PeopleParameterNotFound')
const PeopleIdNotFound = require('../errors/people/PeopleIdNotFound')
const EmailUniqueError = require('../errors/people/EmailUniqueError')
const CpfUniqueError = require('../errors/people/CpfUniqueError')

class PeopleService {
    async create(payload) {
        const data_nascimentoSplited = payload["data_nascimento"].split('/', )
        try {
            payload["data_nascimento"] = data_nascimentoSplited[1] + '/' + data_nascimentoSplited[0] + '/' + data_nascimentoSplited[2]
            const result = await PeopleRepository.create(payload)
            const { senha, ...pessoa } = result.toObject()
            const STATUS_SUCCESS = 201
            return { statusCode: STATUS_SUCCESS, pessoa: pessoa }
        } catch (error) {
            if (Object.keys(error.keyValue)[0] == 'cpf') {
                throw new CpfUniqueError()
            }
            if (Object.keys(error.keyValue)[0] == 'email') {
                throw new EmailUniqueError()
            }
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
        if (payload.data_nascimento != undefined) {
            const data_nascimentoSplited = payload.data_nascimento.split('/', )
            payload.data_nascimento = data_nascimentoSplited[1] + '/' + data_nascimentoSplited[0] + '/' + data_nascimentoSplited[2]
        }

        if (payload.email != undefined) {
            var AnyEmail = { email: payload.email }
            var EmailNotUnique = await PeopleRepository.findByQuery(AnyEmail)
            if (EmailNotUnique[0] != undefined) {
                throw new EmailUniqueError()
            }
        }
        if (payload.cpf != undefined) {
            var AnyCpf = { cpf: payload.cpf }
            var CpfNotUnique = await PeopleRepository.findByQuery(AnyCpf)
            if (CpfNotUnique[0] != undefined) {
                throw new CpfUniqueError()
            }
        }

        Object.assign(pessoa, payload)
        pessoa.save()
        return { statusCode: STATUS_SUCCESS, pessoa: { pessoa } }
    }
}

module.exports = new PeopleService()