const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');
const authToken = require('../../../tools/authForTests');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should update a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestOriginal = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const veiculoTestUpdate = {
    modelo: 'GM S10 2.8',
    cor: 'azul',
    ano: 2005,
    acessorios: [{ descricao: 'ABS' }, { descricao: 'GPS' }],
    quantidadePassageiros: 4
  };

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .put(`/api/v1/car/${payload.body._id}`)
    .send(veiculoTestUpdate)
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    cor: veiculoTestUpdate.cor,
    quantidadePassageiros: veiculoTestUpdate.quantidadePassageiros,
    modelo: veiculoTestUpdate.modelo,
    ano: veiculoTestUpdate.ano,
    acessorios: [
      { _id: expect.any(String), descricao: veiculoTestUpdate.acessorios[0].descricao },
      { _id: expect.any(String), descricao: veiculoTestUpdate.acessorios[1].descricao }
    ]
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    cor: expect.any(String),
    quantidadePassageiros: expect.any(Number),
    modelo: expect.any(String),
    ano: expect.any(Number),
    acessorios: [
      { _id: expect.any(String), descricao: expect.any(String) },
      { _id: expect.any(String), descricao: expect.any(String) }
    ]
  });
});

it('dont should update a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestModelUnique = {
    modelo: 'GM S10 2.8',
    cor: 'verde',
    ano: 2008,
    acessorios: [{ descricao: 'Rádio' }],
    quantidadePassageiros: 6
  };

  const veiculoTestOriginal = {
    modelo: 'AD X22 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const veiculoTestUpdate = {
    modelo: 'GM S10 2.8',
    cor: 'azul',
    ano: 2005,
    acessorios: [{ descricao: 'ABS' }, { descricao: 'GPS' }],
    quantidadePassageiros: 4
  };

  await request(app).post('/api/v1/car/').send(veiculoTestModelUnique).set('Authorization', `Bearer ${token}`);

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .put(`/api/v1/car/${payload.body._id}`)
    .send(veiculoTestUpdate)
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(409);
});
