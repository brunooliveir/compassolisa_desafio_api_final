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
        if (JSON.stringify(await CarService.findOneById(req.params.id)) == 'null')
            return res.status(400).send(
                'Error: car id not found'
            )
        const veiculo = await CarService.findOneById(req.params.id)
        return res.status(200).send(
            JSON.stringify(veiculo)
        )
    }

    async deleteOne(req, res) {
        if (JSON.stringify(await CarService.findOneById(req.params.id)) == 'null')
            return res.status(400).send(
                'Error: car id not found'
            )
        await CarService.deleteOne(req.params.id)
        return res.status(204).end()
    }


}

module.exports = new CarController()