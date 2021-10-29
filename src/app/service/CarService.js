const CarRepository = require('../repository/CarRepository')
const CarParameterNotFound = require('../errors/car/CarParameterNotFound')
const CarIdNotFound = require('../errors/car/CarIdNotFound')
const ModeloUniqueError = require('../errors/car/ModeloUniqueError')
const IdFormatError = require('../errors/car/IdFormatError')

class CarService {
    async create(payload) {
        const AnyModelo = { modelo: payload.modelo }
        const ModeloNotUnique = await CarRepository.findByQuery(AnyModelo)
        if (!!ModeloNotUnique[0]) {
            throw new ModeloUniqueError()
        }
        const veiculo = await CarRepository.create(payload)
        return veiculo
    }

    async checkVeiculoId(payload) {
        try {
            const veiculo = await CarRepository.findOneById(payload)
            return veiculo
        } catch (error) {
            if (error.message.split(" ", )[0] == 'Cast' && error.message.split(" ", )[2] == 'ObjectId') {
                throw new IdFormatError()
            }
        }
    }

    async checkVeiculoNull(payload) {
        const veiculo = payload
        if (veiculo == null) {
            throw new CarIdNotFound()
        }
    }


    async checkQuery(payload) {
        Object.keys(payload).forEach(element => {
            if (element == 'descricao') {
                const newKeyValue = { 'acessorios.descricao': payload["descricao"] }
                delete payload["descricao"]
                Object.assign(payload, newKeyValue)
            }
        })
        if (!!payload.limit) {
            payload.limit = parseInt(payload.limit)
        }
        if (!!payload.offset) {
            payload.offset = parseInt(payload.offset)
            payload.skip = payload.offset
        }
        if (!!payload.offsets) {
            payload.offsets = parseInt(payload.offsets)
            if (!!payload.skip) {
                payload.skip += payload.offsets
            } else {
                payload.skip = payload.offsets
            }
        }

        const veiculos = await CarRepository.findByQuery(payload)
        const { limit, offset, offsets, skip, ...veiculosWithOutPagination } = payload
        const veiculosTotal = (await CarRepository.findByQuery(veiculosWithOutPagination)).length
        if (veiculosTotal == 0) {
            throw new CarParameterNotFound()
        }
        return { veiculos: veiculos, total: veiculosTotal, limit: payload.limit, offset: payload.offset, offsets: payload.offsets }
    }

    async checkVeiculoDelete(id) {
        await CarRepository.deleteOne(id)
        return
    }

    async checkVeiculoUpdate(id, payload) {
        const veiculo = await CarRepository.findOneById(id)
        const AnyModelo = { modelo: payload.modelo }
        const ModeloNotUnique = await CarRepository.findByQuery(AnyModelo)
        if (!!ModeloNotUnique[0] && id != ModeloNotUnique[0].id) {
            throw new ModeloUniqueError()
        }
        Object.assign(veiculo, payload)
        veiculo.save()
        return veiculo
    }

}

module.exports = new CarService()