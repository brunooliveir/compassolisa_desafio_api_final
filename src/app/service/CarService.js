const CarRepository = require('../repository/CarRepository')

class CarService {
    async create(payload) {
        try {
            const result = await CarRepository.create(payload)
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = new CarService()