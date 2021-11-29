const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should update a people by id', async () => {
  const pessoaTestOriginal = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestUpdate = {
    nome: 'Alvaro',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'não'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTestOriginal);

  const response = await request(app).put(`/api/v1/people/${payload.body._id}`).send(pessoaTestUpdate);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    cpf: pessoaTestUpdate.cpf,
    data_nascimento: '2001-05-15T03:00:00.000Z',
    email: pessoaTestUpdate.email,
    habilitado: pessoaTestUpdate.habilitado,
    nome: pessoaTestUpdate.nome
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    cpf: expect.any(String),
    data_nascimento: expect.any(String),
    email: expect.any(String),
    habilitado: expect.any(String),
    nome: expect.any(String)
  });
});

it('dont should update a people by id', async () => {
  const pessoaTestCpfUnique = {
    nome: 'Fabio ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'fabiociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestEmailUnique = {
    nome: 'Pedro ciclano',
    cpf: '513.411.618-03',
    data_nascimento: '15/05/2001',
    email: 'pedrociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestOriginal = {
    nome: 'joão ciclano',
    cpf: '100.610.762-28',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestUpdate1 = {
    nome: 'joão ciclano',
    cpf: '513.411.618-03',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'não'
  };

  const pessoaTestUpdate2 = {
    nome: 'joão ciclano',
    cpf: '100.610.762-28',
    data_nascimento: '15/05/2001',
    email: 'pedrociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  await request(app).post('/api/v1/people/').send(pessoaTestCpfUnique);

  await request(app).post('/api/v1/people/').send(pessoaTestEmailUnique);

  const payload = await request(app).post('/api/v1/people/').send(pessoaTestOriginal);

  const response1 = await request(app).put(`/api/v1/people/${payload.body._id}`).send(pessoaTestUpdate1);

  expect(response1.status).toBe(409);

  const response2 = await request(app).put(`/api/v1/people/${payload.body._id}`).send(pessoaTestUpdate2);

  expect(response2.status).toBe(409);

  const response3 = await request(app).put(`/api/v1/people/617fc14c0066e3a486717d55`).send(pessoaTestUpdate2);

  expect(response3.status).toBe(404);
});
