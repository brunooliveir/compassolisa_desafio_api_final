class IdadeError extends Error {
  constructor(age) {
    const message = `Invalid data_nascimento field, age ${age} is not bigger than 18 years`;
    super(message);
    this.name = 'Bad Request';
  }
}

module.exports = IdadeError;
