const CarSchema = require('../schema/CarSchema')


class CarRepository {
    async create(payload) {
        return CarSchema.create(payload)
    }

    async findByQuery(payload) {
        return CarSchema.find(payload).limit(payload.limit).sort({
            created_at: 'asc'
        }).skip(payload.skip)
    }

    async findOneById(payload) {
        return CarSchema.findById({ _id: payload })
    }

    async deleteOne(payload) {
        return CarSchema.deleteOne({ _id: payload })
    }

}

module.exports = new CarRepository()