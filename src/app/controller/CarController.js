const CarService = require('../service/CarService')

class CarController {
    async create(req, res) {
        const veiculos = await CarService.create(req.body)
        return res.status(201).json({ veiculos })
    }

    async listAll(req, res) {
        const veiculos = await CarService.listAll()
        return res.status(200).send(
            JSON.stringify({ veiculos })
        )
    }

    async findOneById(req, res) {
        const id = req.params.id
        const result = await CarService.checkVeiculoId(id)
        return res.status(result[0]).send(result[1])
    }

    async deleteOne(req, res) {
        const id = req.params.id
        const checkedVeiculoId = await CarService.checkVeiculoId(id)
        const result = await CarService.checkVeiculoDelete(id, checkedVeiculoId)
        return res.status(result[0]).send(result[1])
    }

    async updateById(req, res) {
        const id = req.params.id
        const body = req.body
        const checkedVeiculoId = await CarService.checkVeiculoId(id)
        const result = await CarService.checkVeiculoUpdate(id, body, checkedVeiculoId)
        return res.status(result[0]).send(result[1])
    }

}

module.exports = new CarController()