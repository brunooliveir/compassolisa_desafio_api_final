const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should delete a people by id', async () => {
  const pessoaTest = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTest);

  const response = await request(app).delete(`/api/v1/people/${payload.body._id}`).send();

  expect(response.status).toBe(204);
});

it('dont should delete a people by id', async () => {
  const pessoaTest = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTest);

  await request(app).delete(`/api/v1/people/${payload.body._id}`).send();

  const response = await request(app).delete(`/api/v1/people/${payload.body._id}`).send();

  expect(response.status).toBe(404);
});
