const PeopleSchema = require('../schema/PeopleSchema')


class PeopleRepository {
    async create(payload) {
        return PeopleSchema.create(payload)
    }

    async findByQuery(payload) {
        return PeopleSchema.find(payload).limit(payload.limit).sort({
            created_at: 'asc'
        }).skip(payload.skip)
    }

    async findOneById(payload) {
        return PeopleSchema.findById({ _id: payload })
    }

    async deleteOne(payload) {
        return PeopleSchema.deleteOne({ _id: payload })
    }
}



module.exports = new PeopleRepository()