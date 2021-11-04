const PeopleSchema = require('../schema/PeopleSchema')
const PeopleIdNotFound = require('../errors/people/PeopleIdNotFound')

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
        const finded = await PeopleSchema.findById({ _id: payload })
        if (finded == null) {
            throw new PeopleIdNotFound(payload)
        }
        return finded
    }

    async UpdateOneById(id, payload) {
        const finded = PeopleSchema.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false })
        return finded
    }

    async deleteOne(payload) {
        const finded = await PeopleSchema.findById({ _id: payload })
        if (finded == null) {
            throw new PeopleIdNotFound(payload)
        }
        return PeopleSchema.deleteOne({ _id: payload })
    }
}

module.exports = new PeopleRepository()