const CarSchema = require('../schema/CarSchema')


class CarRepository {
    async create(payload) {
        return CarSchema.create(payload)
    }

    async findByQuery(query, limit, offset, offsets) {
        return CarSchema.find(query).limit(limit).sort('_id').skip(offset + offsets)
    }

    async findOneById(id) {
        return CarSchema.findById({ _id: id })
    }

    async deleteOne(id) {
        return CarSchema.deleteOne({ _id: id })
    }

}

module.exports = new CarRepository()