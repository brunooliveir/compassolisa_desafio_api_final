const RentalSchema = require('../schema/RentalSchema')


class RentalRepository {
    async create(payload) {
        return RentalSchema.create(payload)
    }

    async findByQuery(payload) {
        return await RentalSchema.find(payload).limit(payload.limit).sort({
            created_at: 'asc'
        }).skip(payload.skip)
    }

}

module.exports = new RentalRepository()