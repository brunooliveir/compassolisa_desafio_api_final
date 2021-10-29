const moment = require('moment')
const PeopleRepository = require('../repository/PeopleRepository')
const PeopleParameterNotFound = require('../errors/people/PeopleParameterNotFound')
const PeopleIdNotFound = require('../errors/people/PeopleIdNotFound')
const EmailUniqueError = require('../errors/people/EmailUniqueError')
const CpfUniqueError = require('../errors/people/CpfUniqueError')
const IdadeError = require('../errors/people/IdadeError')
const IdFormatError = require('../errors/people/IdFormatError')

class PeopleService {
    async create(payload) {
        const data_nascimentoSplited = payload.data_nascimento.split('/', )
        try {
            payload.data_nascimento = data_nascimentoSplited[1] + '/' + data_nascimentoSplited[0] + '/' + data_nascimentoSplited[2]
            const result = await PeopleRepository.create(payload)
            const { senha, ...pessoa } = result.toObject()
            return pessoa
        } catch (error) {
            if (Object.keys(error.keyValue)[0] == 'cpf') {
                throw new CpfUniqueError()
            }
            if (Object.keys(error.keyValue)[0] == 'email') {
                throw new EmailUniqueError()
            }
        }
    }

    async checkIdade(payload) {
        const MINIMUM_AGE = 18
        const data_nascimento = moment(payload['data_nascimento'], 'DD/MM/YYYY').format('YYYY/MM/DD')
        const today = new Date()
        const age = (moment(today).diff(new Date(data_nascimento), 'years'))
        if (age < MINIMUM_AGE) {
            throw new IdadeError()
        }
    }

    async checkPessoaId(id) {
        try {
            const pessoa = await PeopleRepository.findOneById(id)
            if (pessoa == null) {
                throw new PeopleIdNotFound()
            }
            return pessoa
        } catch (error) {
            if (error.message.split(" ", )[0] == 'Cast' && error.message.split(" ", )[2] == 'ObjectId')
                throw new IdFormatError()
        }

    }

    async checkPessoaNull(payload) {
        const pessoa = payload
        if (pessoa == null) {
            throw new PeopleIdNotFound()
        }
    }

    async checkQuery(payload) {
        if (!!payload.limit) {
            payload.limit = parseInt(payload.limit)
        }
        if (!!payload.offset) {
            payload.offset = parseInt(payload.offset)
            payload.skip = payload.offset
        }
        if (!!payload.offsets) {
            payload.offsets = parseInt(payload.offsets)
            if (!!payload.skip) {
                payload.skip += payload.offsets
            } else {
                payload.skip = payload.offsets
            }
        }

        const pessoas = await PeopleRepository.findByQuery(payload)
        const { limit, offset, offsets, skip, ...pessoasWithOutPagination } = payload
        const pessoasTotal = (await PeopleRepository.findByQuery(pessoasWithOutPagination)).length
        if (pessoasTotal == 0) {
            throw new PeopleParameterNotFound()
        }
        return { pessoas: pessoas, total: pessoasTotal, limit: payload.limit, offset: payload.offset, offsets: payload.offsets }
    }

    async checkPessoaDelete(id) {
        await PeopleRepository.deleteOne(id)
        return
    }

    async checkPessoaUpdate(id, payload) {
        const pessoa = await PeopleRepository.findOneById(id)
        const data_nascimentoSplited = payload.data_nascimento.split('/', )
        payload.data_nascimento = data_nascimentoSplited[1] + '/' + data_nascimentoSplited[0] + '/' + data_nascimentoSplited[2]

        if (!!payload.email) {
            const AnyEmail = { email: payload.email }
            const EmailNotUnique = await PeopleRepository.findByQuery(AnyEmail)
            if (!!EmailNotUnique[0] && id != EmailNotUnique[0].id) {
                throw new EmailUniqueError()
            }
        }
        if (!!payload.cpf) {
            const AnyCpf = { cpf: payload.cpf }
            const CpfNotUnique = await PeopleRepository.findByQuery(AnyCpf)
            if (!!CpfNotUnique[0] && id != CpfNotUnique[0].id) {
                throw new CpfUniqueError()
            }
        }
        Object.assign(pessoa, payload)
        pessoa.save()
        const { senha, ...result } = pessoa.toObject()
        return result
    }
}

module.exports = new PeopleService()