const CarService = require('../service/CarService')

class CarController {
    async create(req, res) {
        const result = await CarService.create(req.body)
        return res.status(result["statusCode"]).send(result["veiculo"])
    }

    async findOneById(req, res) {
        const id = req.params.id
        const result = await CarService.checkVeiculoId(id)
        return res.status(result["statusCode"]).send(result["veiculo"])
    }

    async listQuery(req, res) {
        const query = req.query
        const result = await CarService.checkQuery(query)
        return res.status(result["statusCode"]).send({ veiculos: result["veiculos"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
    }

    async deleteOne(req, res) {
        const id = req.params.id
        const checkedVeiculoId = await CarService.checkVeiculoId(id)
        const result = await CarService.checkVeiculoDelete(id, checkedVeiculoId)
        return res.status(result["statusCode"]).send(result["veiculo"])
    }

    async updateById(req, res) {
        const id = req.params.id
        const body = req.body
        const checkedVeiculoId = await CarService.checkVeiculoId(id)
        const result = await CarService.checkVeiculoUpdate(id, body, checkedVeiculoId)
        return res.status(result["statusCode"]).send(result["veiculo"])
    }

}

module.exports = new CarController()