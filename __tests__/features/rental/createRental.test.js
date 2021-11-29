const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should create a rental', async () => {
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

  const response = await request(app).post('/api/v1/rental/').send(locadoraTest);
  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    _id: expect.any(String),
    nome: locadoraTest.nome,
    cnpj: locadoraTest.cnpj,
    atividades: locadoraTest.atividades,
    endereco: [
      {
        bairro: expect.any(String),
        cep: locadoraTest.endereco[0].cep,
        complemento: expect.any(String),
        localidade: expect.any(String),
        logradouro: expect.any(String),
        number: locadoraTest.endereco[0].number,
        uf: expect.any(String)
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

it('dont should create a rental', async () => {
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

  await request(app).post('/api/v1/rental/').send(locadoraTest);

  const response = await request(app).post('/api/v1/rental/').send(locadoraTest);

  expect(response.status).toBe(409);
});
