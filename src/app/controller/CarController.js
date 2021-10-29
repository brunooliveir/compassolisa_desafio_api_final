const CarService = require('../service/CarService')

class CarController {
    async create(req, res, next) {
        try {
            const result = await CarService.create(req.body)
            return res.status(201).send(result)
        } catch (Error) {
            next(Error)
        }
    }

    async findOneById(req, res, next) {
        try {
            const result = await CarService.checkVeiculoId(req.params.id)
            await CarService.checkVeiculoNull(result)
            return res.status(200).send(result)
        } catch (Error) {
            next(Error)
        }
    }

    async listQuery(req, res, next) {
        try {
            const result = await CarService.checkQuery(req.query)
            return res.status(200).send({ veiculos: result["veiculos"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
        } catch (Error) {
            next(Error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const veiculo = await CarService.checkVeiculoId(req.params.id)
            await CarService.checkVeiculoNull(veiculo)
            const result = await CarService.checkVeiculoDelete(req.params.id)
            return res.status(204).send(result)
        } catch (Error) {
            next(Error)
        }
    }

    async updateById(req, res, next) {
        try {
            await CarService.checkVeiculoId(req.params.id)
            const result = await CarService.checkVeiculoUpdate(req.params.id, req.body)
            return res.status(201).send(result)
        } catch (Error) {
            next(Error)
        }
    }

}

module.exports = new CarController()