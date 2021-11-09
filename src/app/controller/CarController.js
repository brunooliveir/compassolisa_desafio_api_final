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

  async findOneById(req, res, next) {
    try {
      const result = await CarService.checkVeiculoId(req.params.id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async listQuery(req, res, next) {
    try {
      const result = await CarService.checkQuery(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async deleteOne(req, res, next) {
    try {
      const result = await CarService.checkVeiculoDelete(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async updateById(req, res, next) {
    try {
      const result = await CarService.checkVeiculoUpdate(req.params.id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }

  async updateAcessorioById(req, res, next) {
    try {
      const veiculo = await CarService.checkVeiculoId(req.params.id);
      const result = await CarService.checkAcessoriosUpdate(veiculo, req.params.id_acessorio, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CarController();
