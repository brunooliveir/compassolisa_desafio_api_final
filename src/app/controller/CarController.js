const { serialize, paginateSerialize } = require('../serialize/carSerialize');
const CarService = require('../service/CarService');

class CarController {
  async create(req, res, next) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async get(req, res, next) {
    try {
      const result = await CarService.getById(req.params.id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await CarService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await CarService.delete(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await CarService.update(req.params.id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async updateAcessorio(req, res, next) {
    try {
      const veiculo = await CarService.getByIds(req.params.idVeiculo, req.params.idAcessorio);
      const result = await CarService.patchCar(veiculo, req.params.idVeiculo, req.params.idAcessorio, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CarController();
