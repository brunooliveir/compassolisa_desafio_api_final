class CpfUniqueError extends Error {
  constructor(cpfValue) {
    const message = `CPF ${cpfValue} already in use`;
    super(message);
    this.name = 'Conflict';
  }
}

module.exports = CpfUniqueError;
