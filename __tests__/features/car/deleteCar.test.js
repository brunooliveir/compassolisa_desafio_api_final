const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');
const authToken = require('../../../tools/authForTests');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should delete a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const payload = await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .delete(`/api/v1/car/${payload.body._id}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(204);
});

it('dont should delete a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const payload = await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  await request(app).delete(`/api/v1/car/${payload.body._id}`).send().set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .delete(`/api/v1/car/${payload.body._id}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(404);
});
