const PeopleSchema = require('../schema/PeopleSchema')


class PeopleRepository {
    async create(payload) {
        return PeopleSchema.create(payload)
    }

    async findByQuery(query, limit, offset, offsets) {
        return PeopleSchema.find(query).limit(limit).sort('_id').skip(offset + offsets)
    }

    async findByQuery(query) {
        return PeopleSchema.find(query)
    }

    async findOneById(id) {
        return PeopleSchema.findById({ _id: id })
    }

    async deleteOne(id) {
        return PeopleSchema.deleteOne({ _id: id })
    }
}



module.exports = new PeopleRepository()