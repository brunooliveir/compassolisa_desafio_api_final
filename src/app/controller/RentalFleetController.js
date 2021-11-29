const { serialize, paginateSerialize } = require('../serialize/rentalFleetSerialize');
const RentalFleetService = require('../service/RentalFleetService');

class RentalFleetController {
  async create(req, res, next) {
    try {
      const result = await RentalFleetService.create(req.params.idLocadora, req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async get(req, res, next) {
    try {
      const result = await RentalFleetService.getById(req.params.id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await RentalFleetService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await RentalFleetService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await RentalFleetService.update(req.params.id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new RentalFleetController();
