const CarRepository = require('../repository/CarRepository')
const CarParameterNotFound = require('../errors/car/CarParameterNotFound')
const CarIdNotFound = require('../errors/car/CarIdNotFound')
const ModeloUniqueError = require('../errors/car/ModeloUniqueError')

class CarService {
    async create(payload) {
        try {
            const veiculo = await CarRepository.create(payload)
            const STATUS_SUCCESS = 201
            return { statusCode: STATUS_SUCCESS, veiculo: veiculo }
        } catch (error) {
            if (Object.keys(error.keyValue)[0] == 'modelo') {
                throw new ModeloUniqueError()
            }
        }
    }

    async checkVeiculoId(id) {
        const veiculo = await CarRepository.findOneById(id)
        const STATUS_SUCCESS = 200
        if (veiculo == null) {
            throw new CarIdNotFound()
        }
        return { statusCode: STATUS_SUCCESS, veiculo: veiculo }
    }

    async checkQuery(query) {
        const LIMIT = 100
        const OFFSET = 0
        const OFFSETS = 0
        Object.keys(query).forEach(element => {
            console.log(element)
            if (element == 'descricao') {
                const newKeyValue = { 'acessorios.descricao': query["descricao"] }
                delete query["descricao"]
                Object.assign(query, newKeyValue)
            }
        })
        const veiculos = await CarRepository.findByQuery(query, LIMIT, OFFSET, OFFSETS)
        const STATUS_SUCCESS = 200
        if (veiculos.length == 0) {
            throw new CarParameterNotFound()
        }
        return { statusCode: STATUS_SUCCESS, veiculos: veiculos, total: veiculos.length, limit: LIMIT, offset: OFFSET, offsets: OFFSETS }
    }

    async checkVeiculoDelete(id, checkedVeiculoId) {
        const STATUS_SUCCESS = 204
        if (checkedVeiculoId["statusCode"] == 404) {
            throw new CarIdNotFound()
        }
        await CarRepository.deleteOne(id)
        return { statusCode: STATUS_SUCCESS, }
    }

    async checkVeiculoUpdate(id, payload, checkedVeiculoId) {
        if (checkedVeiculoId["statusCode"] == 404) {
            throw new CarIdNotFound()
        }
        const STATUS_SUCCESS = 201
        const veiculo = await CarRepository.findOneById(id)
        Object.keys(payload).forEach(element => {
            if (veiculo[element] == undefined) {
                throw new CarParameterNotFound()
            }
        })
        if (payload.modelo != undefined) {
            var AnyModelo = { modelo: payload.modelo }
            var ModeloNotUnique = await CarRepository.findByQuery(AnyModelo)
            if (ModeloNotUnique[0] != undefined) {
                throw new ModeloUniqueError()
            }
        }
        Object.assign(veiculo, payload)
        veiculo.save()
        return { statusCode: STATUS_SUCCESS, veiculo: { veiculo } }
    }

}

module.exports = new CarService()