const CarRepository = require('../repository/CarRepository')
const CarParameterNotFound = require('../errors/car/CarParameterNotFound')
const CarIdNotFound = require('../errors/car/CarIdNotFound')
const ModeloUniqueError = require('../errors/car/ModeloUniqueError')
const IdFormatError = require('../errors/car/IdFormatError')
const AcessorioUniqueError = require('../errors/car/AcessorioUniqueError')
const CarAcessorioIdNotFound = require('../errors/car/CarAcessorioIdNotFound')
const CarAcessorioWillBecomeEmpty = require('../errors/car/CarAcessorioWillBecomeEmpty')
const CarIdAndAcessorioIdNotMatch = require('../errors/car/CarIdAndAcessorioIdNotMatch')

class CarService {
    async create(payload) {
        const AnyModelo = { modelo: payload.modelo }
        const ModeloNotUnique = await CarRepository.findByQuery(AnyModelo)
        if (!!ModeloNotUnique[0]) {
            throw new ModeloUniqueError(payload.modelo)
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
                throw new IdFormatError(payload)
            }
        }
    }

    async checkVeiculoNull(payload, Id) {
        const veiculo = payload
        if (veiculo == null) {
            throw new CarIdNotFound(Id)
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
            throw new CarParameterNotFound(payload)
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
            throw new ModeloUniqueError(payload.modelo)
        }
        Object.assign(veiculo, payload)
        veiculo.save()
        return veiculo
    }


    async checkAcessoriosUpdate(veiculo, id_acessorio, payload) {
        try {
            await CarRepository.findOneByAcessorioId(id_acessorio)
        } catch (error) {
            if (error.message.split(" ", )[0] == 'Cast' && error.message.split(" ", )[2] == 'ObjectId') {
                throw new IdFormatError(id_acessorio)
            }
        }
        const veiculoFindedByAcessorioId = await CarRepository.findOneByAcessorioId(id_acessorio)
        if (veiculoFindedByAcessorioId == null) {
            throw new CarAcessorioIdNotFound(id_acessorio)
        }
        if (veiculo._id != veiculoFindedByAcessorioId.id) {
            throw new CarIdAndAcessorioIdNotMatch(veiculo._id, id_acessorio)
        }
        const acessoriosLenght = veiculoFindedByAcessorioId.acessorios.length
        veiculoFindedByAcessorioId.acessorios.forEach(element => {
            if (element._id == id_acessorio && element.descricao == payload.descricao) {
                if (acessoriosLenght == 1) {
                    throw new CarAcessorioWillBecomeEmpty()
                }
                CarRepository.PullAcessorioById(id_acessorio, payload)
                return CarRepository.findOneById(veiculoFindedByAcessorioId._id)
            }
            if (element._id != id_acessorio && element.descricao == payload.descricao) {
                throw new AcessorioUniqueError(element.descricao)
            }
        })
        CarRepository.PushAcessorioById(id_acessorio, payload)
        return await CarRepository.findOneById(veiculoFindedByAcessorioId._id)
    }
}

module.exports = new CarService()