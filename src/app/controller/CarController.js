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
}

module.exports = new CarController()