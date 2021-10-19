const CarService = require('../service/CarService')

class CarController {
    async create(req, res) {
        const result = await CarService.create(req.body)
        return res.status(201).json(result)
    }
}

module.exports = new CarController()