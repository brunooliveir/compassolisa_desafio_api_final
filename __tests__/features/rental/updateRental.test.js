const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should update a rental by id', async () => {
  const locadoraTestOriginal = {
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

  const locadoraTestUpdate = {
    nome: 'Localiza Rent a Car',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-500',
        number: '2235',
        complemento: 'Muro B',
        isFilial: false
      }
    ]
  };

  const payload = await request(app).post('/api/v1/rental/').send(locadoraTestOriginal);

  const response = await request(app).put(`/api/v1/rental/${payload.body._id}`).send(locadoraTestUpdate);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    nome: locadoraTestUpdate.nome,
    cnpj: locadoraTestUpdate.cnpj,
    atividades: locadoraTestUpdate.atividades,
    endereco: [
      {
        bairro: response.body.endereco[0].bairro,
        cep: locadoraTestUpdate.endereco[0].cep,
        complemento: response.body.endereco[0].complemento,
        localidade: response.body.endereco[0].localidade,
        logradouro: response.body.endereco[0].logradouro,
        number: locadoraTestUpdate.endereco[0].number,
        uf: response.body.endereco[0].uf
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

it('dont should update a rental by id', async () => {
  const locadoraTestNomeUnique = {
    nome: 'Localiza Rent a Car',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Carros E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-500',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const locadoraTestOriginal = {
    nome: 'Guanabara autolocadora',
    cnpj: '45.320.217/0001-17',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const locadoraTestUpdateNameError = {
    nome: 'Localiza Rent a Car',
    cnpj: '53.163.566/0001-09',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  await request(app).post('/api/v1/rental/').send(locadoraTestNomeUnique);

  const payload = await request(app).post('/api/v1/rental/').send(locadoraTestOriginal);

  const response1 = await request(app).put(`/api/v1/rental/${payload.body._id}`).send(locadoraTestUpdateNameError);

  expect(response1.status).toBe(409);

  const locadoraTestUpdateCnpjError = {
    nome: 'Guanabara autolocadora',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const response2 = await request(app).put(`/api/v1/rental/${payload.body._id}`).send(locadoraTestUpdateCnpjError);

  expect(response2.status).toBe(409);
});
