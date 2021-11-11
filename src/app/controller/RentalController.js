const { serialize, paginateSerialize } = require('../serialize/rentalSerialize');
const RentalService = require('../service/RentalService');

class RentalController {
  async create(req, res, next) {
    try {
      const result = await RentalService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async get(req, res, next) {
    try {
      const result = await RentalService.getById(req.params.id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await RentalService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await RentalService.delete(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await RentalService.update(req.params.id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new RentalController();
