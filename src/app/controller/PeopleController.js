const PeopleService = require('../service/PeopleService')

class PeopleController {
    async create(req, res, next) {
        try {
            await PeopleService.checkIdade(req.body)
            const result = await PeopleService.create(req.body)
            return res.status(201).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async findOneById(req, res, next) {
        try {
            const result = await PeopleService.checkPessoaId(req.params.id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async listQuery(req, res, next) {
        try {
            const result = await PeopleService.checkQuery(req.query)
            return res.status(200).json({ pessoas: result["pessoas"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
        } catch (error) {
            return next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const result = await PeopleService.checkPessoaDelete(req.params.id)
            return res.status(204).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async updateById(req, res, next) {
        try {
            await PeopleService.checkIdade(req.body)
            const result = await PeopleService.checkPessoaUpdate(req.params.id, req.body)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new PeopleController()