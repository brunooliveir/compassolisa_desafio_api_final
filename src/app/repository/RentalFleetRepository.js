const Repository = require('./Repository');
const RentalFleetSchema = require('../schema/RentalFleetSchema');

class RentalFleetRepository extends Repository {
  constructor() {
    super(RentalFleetSchema);
  }

  async create(idLocadora, payload) {
    return this.model.create(payload);
  }
}

module.exports = new RentalFleetRepository();
