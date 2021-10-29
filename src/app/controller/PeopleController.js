const PeopleService = require('../service/PeopleService')

class PeopleController {
    async create(req, res, next) {
        try {
            await PeopleService.checkIdade(req.body)
            const result = await PeopleService.create(req.body)
            return res.status(201).send(result)
        } catch (Error) {
            return next(Error)
        }
    }

    async findOneById(req, res, next) {
        try {
            const result = await PeopleService.checkPessoaId(req.params.id)
            return res.status(200).send(result)
        } catch (Error) {
            return next(Error)
        }
    }

    async listQuery(req, res, next) {
        try {
            const result = await PeopleService.checkQuery(req.query)
            return res.status(200).send({ pessoas: result["pessoas"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
        } catch (Error) {
            return next(Error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            await PeopleService.checkPessoaId(req.params.id)
            const result = await PeopleService.checkPessoaDelete(req.params.id)
            return res.status(204).send(result)
        } catch (Error) {
            return next(Error)
        }
    }

    async updateById(req, res, next) {
        try {
            await PeopleService.checkPessoaId(req.params.id)
            await PeopleService.checkIdade(req.body)
            const result = await PeopleService.checkPessoaUpdate(req.params.id, req.body)
            return res.status(201).send(result)
        } catch (Error) {
            return next(Error)
        }
    }
}

module.exports = new PeopleController()