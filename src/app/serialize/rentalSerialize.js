const addressesSerialize = (endereco) => ({
  cep: endereco.cep,
  logradouro: endereco.logradouro,
  complemento: endereco.complemento,
  bairro: endereco.bairro,
  number: endereco.number,
  localidade: endereco.localidade,
  uf: endereco.uf
});

const serialize = ({ _id, nome, cnpj, atividades, endereco }) => ({
  _id,
  nome,
  cnpj,
  atividades,
  endereco: endereco.map(addressesSerialize)
});

const paginateSerialize = ({ locadoras, limit, total, offset, offsets }) => ({
  locadoras: locadoras.map(serialize),
  limit,
  total,
  offset,
  offsets
});

module.exports = { serialize, paginateSerialize };
