class PeopleIdNotFound extends Error {
  constructor(Id) {
    const message = `People with id ${Id} not found`;
    super(message);
    this.name = 'Not Found';
  }
}

module.exports = PeopleIdNotFound;
