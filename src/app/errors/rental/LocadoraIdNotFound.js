class LocadoraIdNotFound extends Error {
  constructor(Id) {
    const message = `Rental with id ${Id} not found`;
    super(message);
    this.name = 'Not Found';
  }
}

module.exports = LocadoraIdNotFound;
