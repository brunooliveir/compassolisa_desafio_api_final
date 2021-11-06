const CarSchema = require('../schema/CarSchema')
const CarIdNotFound = require('../errors/car/CarIdNotFound')
const CarAcessorioIdNotFound = require('../errors/car/CarAcessorioIdNotFound')


class CarRepository {
    async create(payload) {
        return await CarSchema.create(payload)
    }

    async findByQuery(payload) {
        return await CarSchema.find(payload).limit(payload.limit).sort({
            created_at: 'asc'
        }).skip(payload.skip)
    }

    async findOneById(payload) {
        const finded = await CarSchema.findById({ _id: payload })
        if (finded == null) {
            throw new CarIdNotFound(payload)
        }
        return finded
    }

    async UpdateOneById(id, payload) {
        const finded = await CarSchema.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false })
        if (finded == null) {
            throw new CarIdNotFound(id)
        }
        return finded
    }

    async findOneByAcessorioId(id) {
        const finded = await CarSchema.findOne({ 'acessorios._id': id })
        if (finded == null) {
            throw new CarAcessorioIdNotFound(id)
        }
        return finded
    }

    async UpdateAcessorioById(id, payload) {
        const finded = CarSchema.findOneAndUpdate({ 'acessorios._id': id }, { acessorios: payload }, { returnOriginal: false })
        return finded
    }

    async deleteOne(payload) {
        const finded = await CarSchema.findById({ _id: payload })
        if (finded == null) {
            throw new CarIdNotFound(payload)
        }
        return CarSchema.deleteOne({ _id: payload })
    }

}

module.exports = new CarRepository()