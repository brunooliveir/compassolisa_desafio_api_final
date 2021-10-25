const CarSchema = require('../schema/CarSchema')


class CarRepository {
    async create(payload) {
        return CarSchema.create(payload)
    }

    async listAll() {
        return CarSchema.find()
    }
    async deleteOne(id) {
        return CarSchema.deleteOne({ _id: id })
    }

    async findOneById(id) {
        return CarSchema.findById({ _id: id })
    }


}

module.exports = new CarRepository()