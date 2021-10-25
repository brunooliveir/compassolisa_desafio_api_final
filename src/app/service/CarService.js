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

    async listAll() {
        return CarRepository.listAll()
    }

    async findOneById(id) {
        return CarRepository.findOneById(id)
    }

    async deleteOne(id) {
        return CarRepository.deleteOne(id)
    }

}

module.exports = new CarService()