const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const IdadeError = require('../errors/BadRequest');
const CpfChecker = require('../utils/cpf');

class PeopleService {
  formatDataNascimento(payload) {
    payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY');
    return payload.data_nascimento;
  }

  async checkIdade(payload) {
    const MINIMUM_AGE = 18;
    const data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY/MM/DD');
    const today = new Date();
    const age = moment(today).diff(new Date(data_nascimento), 'years');
    if (age < MINIMUM_AGE) {
      throw new IdadeError(`age ${age}`);
    }
  }

  async create(payload) {
    payload.data_nascimento = this.formatDataNascimento(payload);
    await CpfChecker(payload.cpf);
    const result = await PeopleRepository.create(payload);
    return result;
  }

  async getById(id) {
    const pessoa = await PeopleRepository.getById(id);
    return pessoa;
  }

  async getAll(payload) {
    if (payload.data_nascimento) payload.data_nascimento = this.formatDataNascimento(payload);
    const pessoas = await PeopleRepository.getAll(payload);
    return pessoas;
  }

  async delete(id) {
    await PeopleRepository.delete(id);
  }

  async update(id, payload) {
    payload.data_nascimento = this.formatDataNascimento(payload);
    await CpfChecker(payload.cpf);
    return PeopleRepository.update(id, payload);
  }
}

module.exports = new PeopleService();
