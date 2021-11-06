const RentalService = require('../service/RentalService')

class RentalController {
    async create(req, res, next) {
        try {
            const result = await RentalService.create(req.body)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async findOneById(req, res, next) {
        try {
            const result = await RentalService.checkLocadoraId(req.params.id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async listQuery(req, res, next) {
        try {
            const result = await RentalService.checkQuery(req.query)
            return res.status(200).json({ locadoras: result["locadoras"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
        } catch (error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const result = await RentalService.checkLocadoraDelete(req.params.id)
            return res.status(204).json(result)
        } catch (error) {
            next(error)
        }
    }

    async updateById(req, res, next) {
        try {
            const result = await RentalService.checkLocadoraUpdate(req.params.id, req.body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }




}

module.exports = new RentalController()