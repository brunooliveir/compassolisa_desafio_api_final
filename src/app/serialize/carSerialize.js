const serialize = ({ _id, modelo, cor, ano, acessorios, quantidadePassageiros }) => {
    return { _id, modelo, cor, ano, acessorios, quantidadePassageiros }
}

const paginateSerialize = ({ veiculos, limit, total, offset, offsets }) => {
    return {
        veiculos: veiculos.map(serialize),
        limit,
        total,
        offset,
        offsets
    }
}

module.exports = { serialize, paginateSerialize }