class BadRequest extends Error {
  constructor(value) {
    const message = `Invalid ${value}`;
    super(message);
    this.description = 'Bad Request';
    this.name = 'Bad Request';
    this.status = 400;
  }
}

module.exports = BadRequest;
