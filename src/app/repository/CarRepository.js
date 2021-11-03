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

    async findOneByAcessorioId(id) { //não esquecer de deletar isso
        return CarSchema.findOne({ 'acessorios._id': id })
    }

    async PushAcessorioById(id, payload) {
        return CarSchema.findOneAndUpdate({ 'acessorios._id': id }, {
            $push: { acessorios: payload }
        })
    }

    async PullAcessorioById(id, payload) {
        return CarSchema.findOneAndUpdate({ 'acessorios._id': id }, {
            $pull: { acessorios: payload }
        })
    }

    async deleteOne(payload) {
        return CarSchema.deleteOne({ _id: payload })
    }

}

module.exports = new CarRepository()