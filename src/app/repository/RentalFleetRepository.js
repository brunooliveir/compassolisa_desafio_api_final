const Repository = require('./Repository');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const RentalFleetSchema = require('../schema/RentalFleetSchema');
const CarSchema = require('../schema/CarSchema');
const RentalSchema = require('../schema/RentalSchema');

class RentalFleetRepository extends Repository {
  constructor() {
    super(RentalFleetSchema);
  }

  async create(idLocadora, payload) {
    const car = await CarSchema.findById({ _id: payload.id_carro });
    if (car == null) throw new NotFound(`id car ${payload.id_carro}`);
    const rentalPayload = await RentalSchema.findById({ _id: payload.id_locadora });
    if (rentalPayload == null) throw new NotFound(`id rental ${payload.id_locadora}`);
    const rentalId = await RentalSchema.findById({ _id: idLocadora });
    if (rentalId == null) throw new NotFound(`id rental ${idLocadora}`);
    const plate = await RentalSchema.findOne({ placa: payload.placa });
    if (plate) throw new Conflict(`licence plate ${payload.placa}`);
    return this.model.create(payload);
  }
}

module.exports = new RentalFleetRepository();
