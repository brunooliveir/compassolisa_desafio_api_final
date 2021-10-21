const CarSchema = require('../schema/CarSchema')


class CarRepository {
    async create(payload) {
        return CarSchema.create(payload)
    }

    async listAll() {
        return CarSchema.find()
    }


}

module.exports = new CarRepository()