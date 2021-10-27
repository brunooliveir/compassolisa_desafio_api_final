const PeopleService = require('../service/PeopleService')

class PeopleController {
    async create(req, res) {
        const result = await PeopleService.create(req.body)
        return res.status(result["statusCode"]).send(result["pessoa"])
    }

    async findOneById(req, res, next) {
        try {
            const id = req.params.id
            const result = await PeopleService.checkPessoaId(id)
            return res.status(result["statusCode"]).send(result["pessoa"])
        } catch (Error) {
            next(Error)
        }

    }

    async listQuery(req, res, next) {
        try {
            const query = req.query
            const result = await PeopleService.checkQuery(query)
            return res.status(result["statusCode"]).send({ pessoas: result["pessoas"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
        } catch (Error) {
            next(Error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const id = req.params.id
            const checkedPessoaId = await PeopleService.checkPessoaId(id)
            const result = await PeopleService.checkPessoaDelete(id, checkedPessoaId)
            return res.status(result["statusCode"]).send(result["pessoa"])
        } catch (Error) {
            next(Error)
        }

    }

    async updateById(req, res, next) {
        try {
            const id = req.params.id
            const body = req.body
            const checkedPessoaId = await PeopleService.checkPessoaId(id)
            const result = await PeopleService.checkPessoaUpdate(id, body, checkedPessoaId)
            return res.status(result["statusCode"]).send(result["pessoa"])
        } catch (Error) {
            next(Error)
        }
    }
}

module.exports = new PeopleController()