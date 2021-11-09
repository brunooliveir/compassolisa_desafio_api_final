class CepInvalidError extends Error {
  constructor(cep) {
    const message = `Invalid CEP ${cep} `;
    super(message);
    this.name = 'Bad Request';
  }
}

module.exports = CepInvalidError;
