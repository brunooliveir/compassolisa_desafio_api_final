const CarRepository = require('../repository/CarRepository')
const Car = require('../schema/CarSchema')

class CarService {
    async create(payload) {
        try {
            const result = await CarRepository.create(payload)
            return result
        } catch (error) {
            return error
        }
    }

    async listAll() {
        return CarRepository.listAll()
    }
}

module.exports = new CarService()