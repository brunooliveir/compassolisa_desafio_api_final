const CarRepository = require('../repository/CarRepository')

class CarService {
    async create(payload) {
        try {
            const result = await CarRepository.create(payload)
            return result
        } catch (error) {
            return error
        }
    }

    async listAll() {
        return CarRepository.listAll()
    }

    async checkVeiculoId(id) {
        try {
            const veiculo = await CarRepository.findOneById(id)
            const STATUS_SUCCESS = 200
            if (veiculo == null) {
                throw new Error('car id not found')
            }
            return [STATUS_SUCCESS, veiculo]

        } catch (Error) {
            const STATUS_FAIL = 404
            return [STATUS_FAIL, { Error: 'car id not found' }]
        }
    }

    async checkVeiculoDelete(id, checkedVeiculoId) {
        try {
            const STATUS_SUCCESS = 204
            if (checkedVeiculoId[0] == 404) {
                throw new Error('car id not found')
            }
            await CarRepository.deleteOne(id)
            return [STATUS_SUCCESS, ]
        } catch (Error) {
            return [checkedVeiculoId[0], { Error: 'car id not found' }]
        }
    }

    async checkVeiculoUpdate(id, body, checkedVeiculoId) {
        try {
            const STATUS_SUCCESS = 201
            if (checkedVeiculoId[0] == 404) {
                throw new Error('car id not found')
            }
            const veiculo = await CarRepository.findOneById(id)
            Object.assign(veiculo, body)
            veiculo.save()
            return [STATUS_SUCCESS, { veiculo: veiculo }]
        } catch (Error) {
            return [checkedVeiculoId[0], { Error: 'car id not found' }]
        }
    }

}

module.exports = new CarService()