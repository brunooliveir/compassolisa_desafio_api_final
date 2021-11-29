const Repository = require('./Repository');
const RentalReserveSchema = require('../schema/RentalReserveSchema');

class RentalReserveRepository extends Repository {
  constructor() {
    super(RentalReserveSchema);
  }

  async create(idLocadora, payload) {
    return this.model.create(payload);
  }
}

module.exports = new RentalReserveRepository();
