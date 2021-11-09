const serialize = ({ _id, modelo, cor, ano, acessorios, quantidadePassageiros }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros
});

const paginateSerialize = ({ veiculos, limit, total, offset, offsets }) => ({
  veiculos: veiculos.map(serialize),
  limit,
  total,
  offset,
  offsets
});

module.exports = { serialize, paginateSerialize };
