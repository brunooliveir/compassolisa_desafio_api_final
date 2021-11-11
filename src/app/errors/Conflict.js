class Conflict extends Error {
  constructor(value) {
    const message = `${value} already in use`;
    super(message);
    this.description = `Conflict`;
    this.name = 'Conflict';
    this.status = 409;
  }
}

module.exports = Conflict;
