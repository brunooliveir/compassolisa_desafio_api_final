const request = require('supertest');
const RentalSchema = require('../../src/app/schema/RentalSchema');
const app = require('../../src/app');
const Database = require('../../src/infra/database/mongo/index');

Database.connect();

beforeAll(async () => {
  await RentalSchema.deleteMany();
});

beforeEach(async () => {
  await RentalSchema.deleteMany();
});

afterAll(async () => {
  await RentalSchema.deleteMany();
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
  expect(response.body.nome).toBe(locadoraTest.nome);
  expect(response.body.cnpj).toBe(locadoraTest.cnpj);
  expect(response.body.atividades).toBe(locadoraTest.atividades);
  expect(response.body.endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(response.body.endereco.number).toBe(locadoraTest.endereco.number);
  expect(response.body.endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(response.body.endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(response.body.endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof response.body.nome).toBe('string');
  expect(typeof response.body.cnpj).toBe('string');
  expect(typeof response.body.atividades).toBe('string');
  expect(typeof response.body.endereco[0].cep).toBe('string');
  expect(typeof response.body.endereco[0].number).toBe('string');
  expect(typeof response.body.endereco[0].descricao).toBe('undefined');
  expect(typeof response.body.endereco[0].complemento).toBe('string');
  expect(typeof response.body.endereco[0].isFilial).toBe('undefined');
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
  expect(response.body.nome).toBe(locadoraTest.nome);
  expect(response.body.cnpj).toBe(locadoraTest.cnpj);
  expect(response.body.atividades).toBe(locadoraTest.atividades);
  expect(response.body.endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(response.body.endereco.number).toBe(locadoraTest.endereco.number);
  expect(response.body.endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(response.body.endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(response.body.endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof response.body.nome).toBe('string');
  expect(typeof response.body.cnpj).toBe('string');
  expect(typeof response.body.atividades).toBe('string');
  expect(typeof response.body.endereco[0].cep).toBe('string');
  expect(typeof response.body.endereco[0].number).toBe('string');
  expect(typeof response.body.endereco[0].descricao).toBe('undefined');
  expect(typeof response.body.endereco[0].complemento).toBe('string');
  expect(typeof response.body.endereco[0].isFilial).toBe('undefined');
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

it('should get a rental by params', async () => {
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

  const responseNome = await request(app).get(`${'/api/v1/rental/?nome='}${payload.body.nome}`).send();

  expect(responseNome.status).toBe(200);
  expect(responseNome.body.locadoras[0].nome).toBe(locadoraTest.nome);
  expect(responseNome.body.locadoras[0].cnpj).toBe(locadoraTest.cnpj);
  expect(responseNome.body.locadoras[0].atividades).toBe(locadoraTest.atividades);
  expect(responseNome.body.locadoras[0].endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(responseNome.body.locadoras[0].endereco.number).toBe(locadoraTest.endereco.number);
  expect(responseNome.body.locadoras[0].endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(responseNome.body.locadoras[0].endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(responseNome.body.locadoras[0].endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof responseNome.body.locadoras[0].nome).toBe('string');
  expect(typeof responseNome.body.locadoras[0].cnpj).toBe('string');
  expect(typeof responseNome.body.locadoras[0].atividades).toBe('string');
  expect(typeof responseNome.body.locadoras[0].endereco[0].cep).toBe('string');
  expect(typeof responseNome.body.locadoras[0].endereco[0].number).toBe('string');
  expect(typeof responseNome.body.locadoras[0].endereco[0].descricao).toBe('undefined');
  expect(typeof responseNome.body.locadoras[0].endereco[0].complemento).toBe('string');
  expect(typeof responseNome.body.locadoras[0].endereco[0].isFilial).toBe('undefined');

  const responseCnpj = await request(app).get(`${'/api/v1/rental/?cnpj='}${payload.body.cnpj}`).send();

  expect(responseCnpj.status).toBe(200);
  expect(responseCnpj.body.locadoras[0].nome).toBe(locadoraTest.nome);
  expect(responseCnpj.body.locadoras[0].cnpj).toBe(locadoraTest.cnpj);
  expect(responseCnpj.body.locadoras[0].atividades).toBe(locadoraTest.atividades);
  expect(responseCnpj.body.locadoras[0].endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(responseCnpj.body.locadoras[0].endereco.number).toBe(locadoraTest.endereco.number);
  expect(responseCnpj.body.locadoras[0].endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(responseCnpj.body.locadoras[0].endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(responseCnpj.body.locadoras[0].endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof responseCnpj.body.locadoras[0].nome).toBe('string');
  expect(typeof responseCnpj.body.locadoras[0].cnpj).toBe('string');
  expect(typeof responseCnpj.body.locadoras[0].atividades).toBe('string');
  expect(typeof responseCnpj.body.locadoras[0].endereco[0].cep).toBe('string');
  expect(typeof responseCnpj.body.locadoras[0].endereco[0].number).toBe('string');
  expect(typeof responseCnpj.body.locadoras[0].endereco[0].descricao).toBe('undefined');
  expect(typeof responseCnpj.body.locadoras[0].endereco[0].complemento).toBe('string');
  expect(typeof responseCnpj.body.locadoras[0].endereco[0].isFilial).toBe('undefined');

  const responseCep = await request(app).get(`${'/api/v1/rental/?cep='}${payload.body.endereco[0].cep}`).send();

  expect(responseCep.status).toBe(200);
  expect(responseCep.body.locadoras[0].nome).toBe(locadoraTest.nome);
  expect(responseCep.body.locadoras[0].cnpj).toBe(locadoraTest.cnpj);
  expect(responseCep.body.locadoras[0].atividades).toBe(locadoraTest.atividades);
  expect(responseCep.body.locadoras[0].endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(responseCep.body.locadoras[0].endereco.number).toBe(locadoraTest.endereco.number);
  expect(responseCep.body.locadoras[0].endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(responseCep.body.locadoras[0].endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(responseCep.body.locadoras[0].endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof responseCep.body.locadoras[0].nome).toBe('string');
  expect(typeof responseCep.body.locadoras[0].cnpj).toBe('string');
  expect(typeof responseCep.body.locadoras[0].atividades).toBe('string');
  expect(typeof responseCep.body.locadoras[0].endereco[0].cep).toBe('string');
  expect(typeof responseCep.body.locadoras[0].endereco[0].number).toBe('string');
  expect(typeof responseCep.body.locadoras[0].endereco[0].descricao).toBe('undefined');
  expect(typeof responseCep.body.locadoras[0].endereco[0].complemento).toBe('string');
  expect(typeof responseCep.body.locadoras[0].endereco[0].isFilial).toBe('undefined');

  const responseNumber = await request(app)
    .get(`${'/api/v1/rental/?number='}${payload.body.endereco[0].number}`)
    .send();

  expect(responseNumber.status).toBe(200);
  expect(responseNumber.body.locadoras[0].nome).toBe(locadoraTest.nome);
  expect(responseNumber.body.locadoras[0].cnpj).toBe(locadoraTest.cnpj);
  expect(responseNumber.body.locadoras[0].atividades).toBe(locadoraTest.atividades);
  expect(responseNumber.body.locadoras[0].endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(responseNumber.body.locadoras[0].endereco.number).toBe(locadoraTest.endereco.number);
  expect(responseNumber.body.locadoras[0].endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(responseNumber.body.locadoras[0].endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(responseNumber.body.locadoras[0].endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof responseNumber.body.locadoras[0].nome).toBe('string');
  expect(typeof responseNumber.body.locadoras[0].cnpj).toBe('string');
  expect(typeof responseNumber.body.locadoras[0].atividades).toBe('string');
  expect(typeof responseNumber.body.locadoras[0].endereco[0].cep).toBe('string');
  expect(typeof responseNumber.body.locadoras[0].endereco[0].number).toBe('string');
  expect(typeof responseNumber.body.locadoras[0].endereco[0].descricao).toBe('undefined');
  expect(typeof responseNumber.body.locadoras[0].endereco[0].complemento).toBe('string');
  expect(typeof responseNumber.body.locadoras[0].endereco[0].isFilial).toBe('undefined');

  const responseDescricao = await request(app)
    .get(`${'/api/v1/rental/?descricao='}${payload.body.endereco[0].descricao}`)
    .send();

  expect(responseDescricao.status).toBe(200);
  expect(responseDescricao.body.locadoras[0].nome).toBe(locadoraTest.nome);
  expect(responseDescricao.body.locadoras[0].cnpj).toBe(locadoraTest.cnpj);
  expect(responseDescricao.body.locadoras[0].atividades).toBe(locadoraTest.atividades);
  expect(responseDescricao.body.locadoras[0].endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(responseDescricao.body.locadoras[0].endereco.number).toBe(locadoraTest.endereco.number);
  expect(responseDescricao.body.locadoras[0].endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(responseDescricao.body.locadoras[0].endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(responseDescricao.body.locadoras[0].endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof responseDescricao.body.locadoras[0].nome).toBe('string');
  expect(typeof responseDescricao.body.locadoras[0].cnpj).toBe('string');
  expect(typeof responseDescricao.body.locadoras[0].atividades).toBe('string');
  expect(typeof responseDescricao.body.locadoras[0].endereco[0].cep).toBe('string');
  expect(typeof responseDescricao.body.locadoras[0].endereco[0].number).toBe('string');
  expect(typeof responseDescricao.body.locadoras[0].endereco[0].descricao).toBe('undefined');
  expect(typeof responseDescricao.body.locadoras[0].endereco[0].complemento).toBe('string');
  expect(typeof responseDescricao.body.locadoras[0].endereco[0].isFilial).toBe('undefined');

  const responseComplemento = await request(app)
    .get(`${'/api/v1/rental/?complemento='}${payload.body.endereco[0].complemento}`)
    .send();

  expect(responseComplemento.status).toBe(200);
  expect(responseComplemento.body.locadoras[0].nome).toBe(locadoraTest.nome);
  expect(responseComplemento.body.locadoras[0].cnpj).toBe(locadoraTest.cnpj);
  expect(responseComplemento.body.locadoras[0].atividades).toBe(locadoraTest.atividades);
  expect(responseComplemento.body.locadoras[0].endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(responseComplemento.body.locadoras[0].endereco.number).toBe(locadoraTest.endereco.number);
  expect(responseComplemento.body.locadoras[0].endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(responseComplemento.body.locadoras[0].endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(responseComplemento.body.locadoras[0].endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof responseComplemento.body.locadoras[0].nome).toBe('string');
  expect(typeof responseComplemento.body.locadoras[0].cnpj).toBe('string');
  expect(typeof responseComplemento.body.locadoras[0].atividades).toBe('string');
  expect(typeof responseComplemento.body.locadoras[0].endereco[0].cep).toBe('string');
  expect(typeof responseComplemento.body.locadoras[0].endereco[0].number).toBe('string');
  expect(typeof responseComplemento.body.locadoras[0].endereco[0].descricao).toBe('undefined');
  expect(typeof responseComplemento.body.locadoras[0].endereco[0].complemento).toBe('string');
  expect(typeof responseComplemento.body.locadoras[0].endereco[0].isFilial).toBe('undefined');

  const responseFlilial = await request(app).get('/api/v1/rental/?isFilial=true').send();

  expect(responseFlilial.status).toBe(200);
  expect(responseFlilial.body.locadoras[0].nome).toBe(locadoraTest.nome);
  expect(responseFlilial.body.locadoras[0].cnpj).toBe(locadoraTest.cnpj);
  expect(responseFlilial.body.locadoras[0].atividades).toBe(locadoraTest.atividades);
  expect(responseFlilial.body.locadoras[0].endereco.cep).toBe(locadoraTest.endereco.cep);
  expect(responseFlilial.body.locadoras[0].endereco.number).toBe(locadoraTest.endereco.number);
  expect(responseFlilial.body.locadoras[0].endereco.descricao).toBe(locadoraTest.endereco.descricao);
  expect(responseFlilial.body.locadoras[0].endereco.complemento).toBe(locadoraTest.endereco.complemento);
  expect(responseFlilial.body.locadoras[0].endereco.isFilial).toBe(locadoraTest.endereco.isFilial);
  expect(typeof responseFlilial.body.locadoras[0].nome).toBe('string');
  expect(typeof responseFlilial.body.locadoras[0].cnpj).toBe('string');
  expect(typeof responseFlilial.body.locadoras[0].atividades).toBe('string');
  expect(typeof responseFlilial.body.locadoras[0].endereco[0].cep).toBe('string');
  expect(typeof responseFlilial.body.locadoras[0].endereco[0].number).toBe('string');
  expect(typeof responseFlilial.body.locadoras[0].endereco[0].descricao).toBe('undefined');
  expect(typeof responseFlilial.body.locadoras[0].endereco[0].complemento).toBe('string');
  expect(typeof responseFlilial.body.locadoras[0].endereco[0].isFilial).toBe('undefined');
});

it('should delete a rental by id', async () => {
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

  const response = await request(app).delete(`/api/v1/rental/${payload.body._id}`).send();

  expect(response.status).toBe(204);
});

it('dont should delete a rental by id', async () => {
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

  await request(app).delete(`/api/v1/rental/${payload.body._id}`).send();

  const response = await request(app).delete(`/api/v1/rental/${payload.body._id}`).send();

  expect(response.status).toBe(404);
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
  expect(response.body.nome).toBe(locadoraTestUpdate.nome);
  expect(response.body.cnpj).toBe(locadoraTestUpdate.cnpj);
  expect(response.body.atividades).toBe(locadoraTestUpdate.atividades);
  expect(response.body.atividades).toBe(locadoraTestUpdate.atividades);
  expect(response.body.endereco.cep).toBe(locadoraTestUpdate.endereco.cep);
  expect(response.body.endereco.number).toBe(locadoraTestUpdate.endereco.number);
  expect(response.body.endereco.complemento).toBe(locadoraTestUpdate.endereco.complemento);
  expect(response.body.endereco.isFilial).toBe(locadoraTestUpdate.endereco.isFilial);
  expect(typeof response.body.nome).toBe('string');
  expect(typeof response.body.cnpj).toBe('string');
  expect(typeof response.body.atividades).toBe('string');
  expect(typeof response.body.endereco[0].cep).toBe('string');
  expect(typeof response.body.endereco[0].number).toBe('string');
  expect(typeof response.body.endereco[0].descricao).toBe('undefined');
  expect(typeof response.body.endereco[0].complemento).toBe('string');
  expect(typeof response.body.endereco[0].isFilial).toBe('undefined');
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
