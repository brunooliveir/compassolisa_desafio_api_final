const CarSchema = require('../../src/app/schema/CarSchema')
const request = require('supertest')
const app = require('../../src/app')
const Database = require('../../src/infra/database/mongo/index')

Database.connect()

beforeAll(async() => {
    await CarSchema.deleteMany()
})

beforeEach(async() => {
    await CarSchema.deleteMany()
})

afterAll(async() => {
    await CarSchema.deleteMany()
    Database.disconnect()
})

it('should create a car', async() => {
    const veiculoTest = {
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
    }

    const response = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTest)
    expect(response.status).toBe(201)
    expect(response.body.modelo).toBe(veiculoTest.modelo)
    expect(response.body.cor).toBe(veiculoTest.cor)
    expect(response.body.acessorios.descricao).toBe(veiculoTest.acessorios.descricao)
    expect(response.body.quantidadePassageiros).toBe(veiculoTest.quantidadePassageiros)
})

it('dont should create a car', async() => {
    const veiculoTest = {
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
    }

    await request(app)
        .post('/api/v1/car/')
        .send(veiculoTest)

    const response = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTest)

    expect(response.status).toBe(400)
})

it('should get a car by id', async() => {
    const veiculoTest = {
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
    }

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTest)

    const response = await request(app)
        .get('/api/v1/car/' + payload.body._id)
        .send()

    expect(response.status).toBe(200)
    expect(response.body.modelo).toBe(veiculoTest.modelo)
    expect(response.body.cor).toBe(veiculoTest.cor)
    expect(response.body.acessorios.descricao).toBe(veiculoTest.acessorios.descricao)
    expect(response.body.quantidadePassageiros).toBe(veiculoTest.quantidadePassageiros)
})

it('should reject id, bad argument', async() => {
    const veiculoTest = {
        _id: '617fc14c0066e3a486717t55' //have 't', invalid Id
    }



    const response = await request(app)
        .get('/api/v1/car/' + veiculoTest._id)
        .send()

    expect(response.status).toBe(400)
})

it('should reject id, Id not found', async() => {
    const veiculoTest = {
        _id: '617fc14c0066e3a486717d55'
    }

    const response = await request(app)
        .get('/api/v1/car/' + veiculoTest._id)
        .send()

    expect(response.status).toBe(404)
})

it('should get a car by params', async() => {
    const veiculoTest = {
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'ABS' }],
        quantidadePassageiros: 5
    }

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTest)


    const responseModelo = await request(app)
        .get('/api/v1/car/' + '?modelo=' + payload.body.modelo)
        .send()

    expect(responseModelo.status).toBe(200)
    expect(responseModelo.body.veiculos[0].modelo).toBe(veiculoTest.modelo)
    expect(responseModelo.body.veiculos[0].cor).toBe(veiculoTest.cor)
    expect(responseModelo.body.veiculos[0].acessorios.descricao).toBe(veiculoTest.acessorios.descricao)
    expect(responseModelo.body.veiculos[0].quantidadePassageiros).toBe(veiculoTest.quantidadePassageiros)

    const responseCor = await request(app)
        .get('/api/v1/car/' + '?cor=' + payload.body.cor)
        .send()

    expect(responseCor.status).toBe(200)
    expect(responseCor.body.veiculos[0].modelo).toBe(veiculoTest.modelo)
    expect(responseCor.body.veiculos[0].cor).toBe(veiculoTest.cor)
    expect(responseCor.body.veiculos[0].acessorios.descricao).toBe(veiculoTest.acessorios.descricao)
    expect(responseCor.body.veiculos[0].quantidadePassageiros).toBe(veiculoTest.quantidadePassageiros)

    const responseAno = await request(app)
        .get('/api/v1/car/' + '?ano=' + payload.body.ano)
        .send()

    expect(responseAno.status).toBe(200)
    expect(responseAno.body.veiculos[0].modelo).toBe(veiculoTest.modelo)
    expect(responseAno.body.veiculos[0].cor).toBe(veiculoTest.cor)
    expect(responseAno.body.veiculos[0].acessorios.descricao).toBe(veiculoTest.acessorios.descricao)
    expect(responseAno.body.veiculos[0].quantidadePassageiros).toBe(veiculoTest.quantidadePassageiros)

    const responseDescricaoPrimeira = await request(app)
        .get('/api/v1/car/' + '?descricao=' + payload.body.acessorios[0].descricao)
        .send()

    expect(responseDescricaoPrimeira.status).toBe(200)
    expect(responseDescricaoPrimeira.body.veiculos[0].modelo).toBe(veiculoTest.modelo)
    expect(responseDescricaoPrimeira.body.veiculos[0].cor).toBe(veiculoTest.cor)
    expect(responseDescricaoPrimeira.body.veiculos[0].acessorios.descricao).toBe(veiculoTest.acessorios.descricao)
    expect(responseDescricaoPrimeira.body.veiculos[0].quantidadePassageiros).toBe(veiculoTest.quantidadePassageiros)

    const responseDescricaoSegunda = await request(app)
        .get('/api/v1/car/' + '?descricao=' + payload.body.acessorios[1].descricao)
        .send()

    expect(responseDescricaoSegunda.status).toBe(200)
    expect(responseDescricaoSegunda.body.veiculos[0].modelo).toBe(veiculoTest.modelo)
    expect(responseDescricaoSegunda.body.veiculos[0].cor).toBe(veiculoTest.cor)
    expect(responseDescricaoSegunda.body.veiculos[0].acessorios.descricao).toBe(veiculoTest.acessorios.descricao)
    expect(responseDescricaoSegunda.body.veiculos[0].quantidadePassageiros).toBe(veiculoTest.quantidadePassageiros)
})

it('should delete a car by id', async() => {
    const veiculoTest = {
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
    }

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTest)

    const response = await request(app)
        .delete('/api/v1/car/' + payload.body._id)
        .send()

    expect(response.status).toBe(204)
})

it('dont should delete a car by id', async() => {
    const veiculoTest = {
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
    }

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTest)

    await request(app)
        .delete('/api/v1/car/' + payload.body._id)
        .send()

    const response = await request(app)
        .delete('/api/v1/car/' + payload.body._id)
        .send()

    expect(response.status).toBe(404)
})

it('should update a car by id', async() => {
    const veiculoTestOriginal = {
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
    }

    const veiculoTestUpdate = {
        modelo: 'GM S10 2.8',
        cor: 'azul',
        ano: 2005,
        acessorios: [{ descricao: 'ABS' }, { descricao: 'GPS' }],
        quantidadePassageiros: 4
    }

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTestOriginal)

    const response = await request(app)
        .put('/api/v1/car/' + payload.body._id)
        .send(veiculoTestUpdate)

    expect(response.status).toBe(200)
    expect(response.body.modelo).toBe(veiculoTestUpdate.modelo)
    expect(response.body.cor).toBe(veiculoTestUpdate.cor)
    expect(response.body.acessorios.descricao).toBe(veiculoTestUpdate.acessorios.descricao)
    expect(response.body.quantidadePassageiros).toBe(veiculoTestUpdate.quantidadePassageiros)
})

it('dont should update a car by id', async() => {
    const veiculoTestModelUnique = {
        modelo: 'GM S10 2.8',
        cor: 'verde',
        ano: 2008,
        acessorios: [{ descricao: 'Rádio' }],
        quantidadePassageiros: 6
    }

    const veiculoTestOriginal = {
        modelo: 'AD X22 2.8',
        cor: 'branco',
        ano: 2021,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
    }

    const veiculoTestUpdate = {
        modelo: 'GM S10 2.8',
        cor: 'azul',
        ano: 2005,
        acessorios: [{ descricao: 'ABS' }, { descricao: 'GPS' }],
        quantidadePassageiros: 4
    }

    await request(app)
        .post('/api/v1/car/')
        .send(veiculoTestModelUnique)

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTestOriginal)

    const response = await request(app)
        .put('/api/v1/car/' + payload.body._id)
        .send(veiculoTestUpdate)

    expect(response.status).toBe(400)
})

it('should update a acessorio of car by id', async() => {
    const veiculoTestOriginal = {
        modelo: 'GM S10 2.8',
        cor: 'verde',
        ano: 2008,
        acessorios: [{ descricao: 'Rádio' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
        quantidadePassageiros: 6
    }

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTestOriginal)


    const response1 = await request(app)
        .patch('/api/v1/car/' + payload.body._id + '/acessorios/' + payload.body.acessorios[0]._id)
        .send({ descricao: 'DVD-player' })

    expect(response1.status).toBe(200)
    expect(response1.body.acessorios[0].descricao).toBe('DVD-player')
    expect(response1.body.acessorios[1].descricao).toBe('ABS')
    expect(response1.body.acessorios[2].descricao).toBe('Ar-Condicionado')

    const response2 = await request(app)
        .patch('/api/v1/car/' + response1.body._id + '/acessorios/' + response1.body.acessorios[0]._id)
        .send({ descricao: 'DVD-player' })

    expect(response2.status).toBe(200)
    expect(response2.body.acessorios[0].descricao).toBe('ABS')
    expect(response2.body.acessorios[1].descricao).toBe('Ar-Condicionado')
})

it('dont should update a acessorio of car by id', async() => {
    const veiculoTestOriginal = {
        modelo: 'GM S10 2.8',
        cor: 'verde',
        ano: 2008,
        acessorios: [{ descricao: 'Rádio' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
        quantidadePassageiros: 6
    }

    const veiculoTestWithAnotherId = {
        modelo: 'Ford Pinto',
        cor: 'amarelo',
        ano: 1970,
        acessorios: [{ descricao: 'Diskman' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
        quantidadePassageiros: 4
    }

    const payload = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTestOriginal)

    const payloadWithAnotherId = await request(app)
        .post('/api/v1/car/')
        .send(veiculoTestWithAnotherId)

    const response1 = await request(app)
        .patch('/api/v1/car/' + payloadWithAnotherId.body._id + '/acessorios/' + payload.body.acessorios[0]._id) // id and acessorios[0]._id not match
        .send({ descricao: 'DVD-player' })

    expect(response1.status).toBe(404) // route not can be /api/v1/car/"id of car x"/acessorios/"id of acessorio of car y"

    const response2 = await request(app)
        .patch('/api/v1/car/' + payload.body._id + '/acessorios/' + payload.body.acessorios[0]._id) // acessorios[0] = 'Rádio'
        .send({ descricao: 'ABS' }) // acessorios[1] == 'ABS'

    expect(response2.status).toBe(400) // acessorios not can be ['ABS','ABS','Ar-Condicionado']

    const response3 = await request(app)
        .patch('/api/v1/car/' + payload.body._id + '/acessorios/' + payload.body.acessorios[0]._id) // acessorios[0] = 'Rádio'
        .send({ descricao: 'ABS       ' }) // acessorios[1] == 'ABS'

    expect(response3.status).toBe(400) // acessorios not can be ['ABS       ','ABS','Ar-Condicionado']
})