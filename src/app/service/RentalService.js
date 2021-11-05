const RentalRepository = require('../repository/RentalRepository')
const CepInvalidError = require('../errors/rental/CepInvalidError')

class RentalService {
    async create(payload, addresses) {
        const fullAddresses = []
        payload.endereco.forEach((endereco, index) => {
            if (addresses[index].data.erro) {
                throw new CepInvalidError(addresses[index].config.url.replace('https://viacep.com.br/ws/', '').replace('/json', ''))
            }
            if (endereco.complemento == undefined) {
                endereco.complemento = addresses[index].data.complemento
            }
            fullAddresses.push({ cep: endereco.cep, logradouro: addresses[index].data.logradouro, complemento: endereco.complemento, bairro: addresses[index].data.bairro, number: endereco.number, localidade: addresses[index].data.localidade, uf: addresses[index].data.uf, isFilial: endereco.isFilial })
        })
        Object.assign(payload, { endereco: fullAddresses })
        const locadora = await RentalRepository.create(payload)
        return locadora
    }

    async checkQuery(payload) {
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
        const locadoras = await RentalRepository.findByQuery(payload)
        const { limit, offset, offsets, skip, ...locadorasWithOutPagination } = payload
        const locadorasTotal = (await RentalRepository.findByQuery(locadorasWithOutPagination)).length
            // if (locadorasTotal == 0) {
            //     throw new RentalParameterNotFound(payload)
            // }
        return { locadoras: locadoras, total: locadorasTotal, limit: payload.limit, offset: payload.offset, offsets: payload.offsets }
    }
}

module.exports = new RentalService()