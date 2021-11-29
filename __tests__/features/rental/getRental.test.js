const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
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
  expect(responseNome.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
  expect(responseNome.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );

  const responseCnpj = await request(app).get(`${'/api/v1/rental/?cnpj='}${payload.body.cnpj}`).send();

  expect(responseCnpj.status).toBe(200);
  expect(responseCnpj.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
  expect(responseCnpj.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );

  const responseCep = await request(app).get(`${'/api/v1/rental/?cep='}${payload.body.endereco[0].cep}`).send();

  expect(responseCep.status).toBe(200);
  expect(responseCep.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
  expect(responseCep.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );

  const responseNumber = await request(app)
    .get(`${'/api/v1/rental/?number='}${payload.body.endereco[0].number}`)
    .send();

  expect(responseNumber.status).toBe(200);
  expect(responseNumber.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
  expect(responseNumber.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );

  const responseDescricao = await request(app)
    .get(`${'/api/v1/rental/?descricao='}${payload.body.endereco[0].descricao}`)
    .send();

  expect(responseDescricao.status).toBe(200);
  expect(responseDescricao.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
  expect(responseDescricao.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );

  const responseComplemento = await request(app)
    .get(`${'/api/v1/rental/?complemento='}${payload.body.endereco[0].complemento}`)
    .send();

  expect(responseComplemento.status).toBe(200);
  expect(responseComplemento.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
  expect(responseComplemento.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );

  const responseFlilial = await request(app).get('/api/v1/rental/?isFilial=true').send();

  expect(responseFlilial.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
  expect(responseFlilial.body.locadoras).toEqual(
    expect.arrayContaining([
      {
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
      }
    ])
  );
});
