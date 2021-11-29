const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should get a rental by id', async () => {
  const locadoraTest = {
    nome: 'Localiza Rent a Car',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Carros E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const payload = await request(app).post('/api/v1/rental/').send(locadoraTest);

  const response = await request(app).get(`/api/v1/rental/${payload.body._id}`).send();

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    nome: locadoraTest.nome,
    cnpj: locadoraTest.cnpj,
    atividades: locadoraTest.atividades,
    endereco: [
      {
        bairro: payload.body.endereco[0].bairro,
        cep: locadoraTest.endereco[0].cep,
        complemento: payload.body.endereco[0].complemento,
        localidade: payload.body.endereco[0].localidade,
        logradouro: payload.body.endereco[0].logradouro,
        number: locadoraTest.endereco[0].number,
        uf: payload.body.endereco[0].uf
      }
    ]
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    nome: expect.any(String),
    cnpj: expect.any(String),
    atividades: expect.any(String),
    endereco: [
      {
        bairro: expect.any(String),
        cep: expect.any(String),
        complemento: expect.any(String),
        localidade: expect.any(String),
        logradouro: expect.any(String),
        number: expect.any(String),
        uf: expect.any(String)
      }
    ]
  });
});

it('should reject id, bad argument', async () => {
  const locadoraTest = {
    _id: '617fc14c0066e3a486717t55' // have 't', invalid Id
  };
  const response = await request(app).get(`/api/v1/rental/${locadoraTest._id}`).send();

  expect(response.status).toBe(400);
});

it('should reject id, Id not found', async () => {
  const locadoraTest = {
    _id: '617fc14c0066e3a486717d55'
  };

  const response = await request(app).get(`/api/v1/rental/${locadoraTest._id}`).send();

  expect(response.status).toBe(404);
});
