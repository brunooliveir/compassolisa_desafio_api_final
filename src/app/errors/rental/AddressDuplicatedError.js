class AddressDuplicatedError extends Error {
  constructor() {
    const message = `Duplicate address`;
    super(message);
    this.name = 'Bad request';
  }
}

module.exports = AddressDuplicatedError;
