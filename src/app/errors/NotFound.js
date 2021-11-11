class NotFound extends Error {
  constructor(value) {
    const message = `Value ${value} not found`;
    super(message);
    this.description = `Not Found`;
    this.name = 'Not Found';
    this.status = 404;
  }
}

module.exports = NotFound;
