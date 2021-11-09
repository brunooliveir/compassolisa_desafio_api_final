const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const PeopleParameterNotFound = require('../errors/people/PeopleParameterNotFound');
const IdadeError = require('../errors/people/IdadeError');

class PeopleService {
  async create(payload) {
    const data_nascimentoSplited = payload.data_nascimento.split('/');
    payload.data_nascimento = `${data_nascimentoSplited[1]}/${data_nascimentoSplited[0]}/${data_nascimentoSplited[2]}`;
    const result = await PeopleRepository.create(payload);
    return result;
  }

  async checkIdade(payload) {
    const MINIMUM_AGE = 18;
    const data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY/MM/DD');
    const today = new Date();
    const age = moment(today).diff(new Date(data_nascimento), 'years');
    if (age < MINIMUM_AGE) {
      throw new IdadeError(age);
    }
  }

  async checkPessoaId(id) {
    const pessoa = await PeopleRepository.findOneById(id);
    return pessoa;
  }

  async checkQuery(payload) {
    if (payload.limit) {
      payload.limit = parseInt(payload.limit, 10);
    }
    if (payload.offset) {
      payload.offset = parseInt(payload.offset, 10);
      payload.skip = payload.offset;
    }
    if (payload.offsets) {
      payload.offsets = parseInt(payload.offsets, 10);
      if (payload.skip) {
        payload.skip += payload.offsets;
      } else {
        payload.skip = payload.offsets;
      }
    }
    if (payload.data_nascimento) {
      const data_nascimentoSplited = payload.data_nascimento.split('/');
      payload.data_nascimento = `${data_nascimentoSplited[1]}/${data_nascimentoSplited[0]}/${data_nascimentoSplited[2]}`;
    }
    const pessoas = await PeopleRepository.findByQuery(payload);
    const { limit, offset, offsets, skip, ...pessoasWithOutPagination } = payload;
    const pessoasTotal = (await PeopleRepository.findByQuery(pessoasWithOutPagination)).length;
    if (pessoasTotal === 0) {
      throw new PeopleParameterNotFound(payload);
    }
    return {
      pessoas,
      total: pessoasTotal,
      limit: payload.limit,
      offset: payload.offset,
      offsets: payload.offsets
    };
  }

  async checkPessoaDelete(id) {
    await PeopleRepository.deleteOne(id);
  }

  async checkPessoaUpdate(id, payload) {
    const data_nascimentoSplited = payload.data_nascimento.split('/');
    payload.data_nascimento = `${data_nascimentoSplited[1]}/${data_nascimentoSplited[0]}/${data_nascimentoSplited[2]}`;
    return PeopleRepository.UpdateOneById(id, payload);
  }
}

module.exports = new PeopleService();
