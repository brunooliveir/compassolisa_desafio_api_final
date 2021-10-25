const PeopleService = require('../service/PeopleService')

class PeopleController {
    async create(req, res) {
        const result = await PeopleService.create(req.body)
        return res.status(result["statusCode"]).send(result["pessoa"])
    }

    async findOneById(req, res) {
        const id = req.params.id
        const result = await PeopleService.checkPessoaId(id)
        return res.status(result["statusCode"]).send(result["pessoa"])
    }

    async listQuery(req, res) {
        const query = req.query
        const result = await PeopleService.checkQuery(query)
        return res.status(result["statusCode"]).send({ pessoas: result["pessoas"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
    }

    async deleteOne(req, res) {
        const id = req.params.id
        const checkedPessoaId = await PeopleService.checkPessoaId(id)
        const result = await PeopleService.checkPessoaDelete(id, checkedPessoaId)
        return res.status(result["statusCode"]).send(result["pessoa"])
    }

    async updateById(req, res) {
        const id = req.params.id
        const body = req.body
        const checkedPessoaId = await PeopleService.checkPessoaId(id)
        const result = await PeopleService.checkPessoaUpdate(id, body, checkedPessoaId)
        return res.status(result["statusCode"]).send(result["pessoa"])
    }


}

module.exports = new PeopleController()