const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');
const authToken = require('../../../tools/authForTests');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should update a acessorio of car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestOriginal = {
    modelo: 'GM S10 2.8',
    cor: 'verde',
    ano: 2008,
    acessorios: [{ descricao: 'Rádio' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
    quantidadePassageiros: 6
  };

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const response1 = await request(app)
    .patch(`/api/v1/car/${payload.body._id}/acessorios/${payload.body.acessorios[0]._id}`)
    .send({ descricao: 'DVD-player' })
    .set('Authorization', `Bearer ${token}`);
  expect(response1.status).toBe(200);
  expect(response1.body.acessorios[0].descricao).toBe('DVD-player');
  expect(response1.body.acessorios[1].descricao).toBe('ABS');
  expect(response1.body.acessorios[2].descricao).toBe('Ar-Condicionado');
  expect(typeof response1.body.acessorios[0].descricao).toBe('string');
  expect(typeof response1.body.acessorios[1].descricao).toBe('string');
  expect(typeof response1.body.acessorios[2].descricao).toBe('string');
});

it('dont should update a acessorio of car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestOriginal = {
    modelo: 'GM S10 2.8',
    cor: 'verde',
    ano: 2008,
    acessorios: [{ descricao: 'Rádio' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
    quantidadePassageiros: 6
  };

  const veiculoTestWithAnotherId = {
    modelo: 'Ford Pinto',
    cor: 'amarelo',
    ano: 1970,
    acessorios: [{ descricao: 'Diskman' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
    quantidadePassageiros: 4
  };

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const payloadWithAnotherId = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestWithAnotherId)
    .set('Authorization', `Bearer ${token}`);

  const response1 = await request(app)
    .patch(`/api/v1/car/${payloadWithAnotherId.body._id}/acessorios/${payload.body.acessorios[0]._id}`) // id and acessorios[0]._id not match
    .send({ descricao: 'DVD-player' })
    .set('Authorization', `Bearer ${token}`);

  expect(response1.status).toBe(404); // route not can be /api/v1/car/"id of car x"/acessorios/"id of acessorio of car y"
});
