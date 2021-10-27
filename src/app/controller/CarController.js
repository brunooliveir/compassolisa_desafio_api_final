const CarService = require('../service/CarService')

class CarController {
    async create(req, res, next) {
        try {
            const result = await CarService.create(req.body)
            return res.status(result["statusCode"]).send(result["veiculo"])
        } catch (Error) {
            next(Error)
        }

    }

    async findOneById(req, res, next) {
        try {
            const id = req.params.id
            const result = await CarService.checkVeiculoId(id)
            return res.status(result["statusCode"]).send(result["veiculo"])
        } catch (Error) {
            next(Error)
        }

    }

    async listQuery(req, res, next) {
        try {
            const query = req.query
            const result = await CarService.checkQuery(query)
            return res.status(result["statusCode"]).send({ veiculos: result["veiculos"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })

        } catch (Error) {
            next(Error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const id = req.params.id
            const checkedVeiculoId = await CarService.checkVeiculoId(id)
            const result = await CarService.checkVeiculoDelete(id, checkedVeiculoId)
            return res.status(result["statusCode"]).send(result["veiculo"])
        } catch (Error) {
            next(Error)
        }
    }

    async updateById(req, res, next) {
        try {
            const id = req.params.id
            const body = req.body
            const checkedVeiculoId = await CarService.checkVeiculoId(id)
            const result = await CarService.checkVeiculoUpdate(id, body, checkedVeiculoId)
            return res.status(result["statusCode"]).send(result["veiculo"])
        } catch (Error) {
            next(Error)
        }
    }

}

module.exports = new CarController()