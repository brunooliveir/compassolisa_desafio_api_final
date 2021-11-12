
# compassolisa_desafio_api_final

O desafio consiste em criar uma API Rest Full da Locadora de veículos Compassolisa, utilizando NodeJS, framework express e o banco de dados MongoDB.

**Lista de tecnologias:** 

<ul>
<li>NodeJS v14.16.0</li>
<li>MongoDB v5.0.3</li>
<li>Docker v20.10.8</li>
<li>Swagger v3.0.1</li>
</ul>

**Dependências:** 
<ul>
<li>joi/date v2.1.0</li>
<li>axios v0.24.0</li>
<li>dotenv v10.0.0,</li>
<li>express v4.17.1,</li>
<li>joi v17.4.2,</li>
<li>jsonwebtoken v8.5.1,</li>
<li>moment v2.29.1,</li>
<li>mongoose v6.0.11,</li>
<li>swagger-ui-express v4.1.6</li>
</ul>

**Dev dependências:** 
<ul>
<li>eslint v7.32.0,</li>
<li>eslint-config-airbnb-base v14.2.1,</li>
<li>eslint-config-plugin v1.0.11,</li>
<li>eslint-config-prettier v8.3.0,</li>
<li>eslint-plugin-import v2.25.2,</li>
<li>jest v27.3.1,</li>
<li>jsonwebtoken v8.5.1,</li>
<li>nodemon v2.0.13,</li>
<li>prettier v2.4.1,</li>
<li>supertest v6.1.6</li>
</ul>

**Cobertura de testes:**

93.73% Statements 1346/1436, 74.52% Branches 196/263, 96% Functions 96/100, 93.73% Lines 1346/1436

## Como rodar a API

Requisitos: Node.js e MongoDB instalados, ou docker-compose instalado.

Após clonar o repositório, caso for utilizar docker na aplicação:

Execute no console na raiz da aplicação: 

```http
    docker-compose up -d
```

Em: **compassolisa_desafio_api_final/.env**

**configure:** 

```http

DB_HOST= 127.0.0.1
DB_USER=
DB_PASS=
DB_NAME= compassolisa
DB_PORT= 3000
DB_COLLECTION = compassolisa

```

e

Em: **compassolisa_desafio_api_final/.env.test**

```http

DB_HOST= 127.0.0.1
DB_USER=
DB_PASS=
DB_NAME= compassolisatest
DB_PORT= 3000
DB_COLLECTION = compassolisatest

```

**Nome do banco de dados a seu critério.

Abra a pasta raiz da aplicação (compassolisa_desafio_api_final), então execute no console os seguintes comandos:


**instalação dos modulos:**
```http
    npm i
```

**Executando a API:**
```http
    npm run start
```
ou

**Executando em modo de desenvolvimento (nodemon):**
```http
    npm run dev
```

ou

**Executando os testes (jest):**
```http
    npm run test /features/people.test.js
    
    npm run test /features/car.test.js
    
    npm run test /features/rental.test.js
```

A API também dispõe de uma rota com a interface Swagger:

```http
http://127.0.0.1:3000/api/v1/api-docs/
```

# Rotas


## Pessoas


#### Cadastra pessoa:


```http
  POST | http://127.0.0.1:3000/api/v1/people/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nome ` | `string` | **Required**. |                
| `cpf`  | `string` | **Required, Unique**. |
| `data_nascimento` | `date` | 'DD/MM/YYYY' **Required** |                
| `email` | `string` |  **Required, Unique** |
| `senha` | `string` | **Required** |
| `habilitado` | `enum[string]` | [sim, não] **Required** |


#### Consulta todas as pessoas:



```http
  GET | http://127.0.0.1:3000/api/v1/people/
```


#### Consulta pessoa por parametros:


```http
  GET | http://127.0.0.1:3000/api/v1/people/?paramKey=paramValue
  
```


#### Consulta um pessoa por Id:



```http
  GET | http://127.0.0.1:3000/api/v1/people/:id
```



#### Altera as propriedades de uma pessoa, encontrada por Id:



```http
  PUT | http://127.0.0.1:3000/api/v1/people/:id
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nome ` | `string` | **Required**. |                
| `cpf`  | `string` | **Required, Unique**. |
| `data_nascimento` | `date` | 'DD/MM/YYYY' **Required** |                
| `email` | `string` |  **Required, Unique** |
| `senha` | `string` | **Required** |
| `habilitado` | `enum[string]` | [sim, não] **Required** |



#### Deleta uma pessoa, encontrado por Id:



```http
  DELETE | http://127.0.0.1:3000/api/v1/people/:id
```


## Autenticação


#### Autentica uma pessoa, gera um token de Autenticação:

```http
  POST | http://127.0.0.1:3000/api/v1/authenticate/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |                            
| `email` | `string` |  **Required** |
| `senha` | `string` | **Required** |
| `habilitado` | `enum[string]` | [sim, não] **Required** |


## Veiculos
## IMPORTANTE: Todas as rotas de veículos necessitam de token de autenticação.


#### Cadastra carro:


```http
  POST | http://127.0.0.1:3000/api/v1/car/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `modelo ` | `string` | **Required, Unique**. |                
| `cor`     | `string` | **Required**. |
| `ano` | `number` | **Required** |                
| `acessorios` | `Array[descricao]` |  **Required** |
| `[descricao]` | `string` | **Required** |
| `quantidadePassageiros` | `number` | **Required** |


#### Consulta todos os veiculos:



```http
  GET | http://127.0.0.1:3000/api/v1/car/
```


#### Consulta veiculos por parametros:


```http
  GET | http://127.0.0.1:3000/api/v1/car/?paramKey=paramValue
```


#### Consulta um veiculo por Id:



```http
  GET | http://127.0.0.1:3000/api/v1/car/:id
```



#### Altera as propriedades de um veiculo, encontrado por Id:



```http
  PUT | http://127.0.0.1:3000/api/v1/car/:id
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `modelo ` | `string` |  **Required, Unique**. |                
| `cor`     | `string` | **Required**|
| `ano` | `number` |**Required** |                
| `acessorios` | `Array[descricao]` |  **Required**|
| `[descricao]` | `string` | **Required**|
| `quantidadePassageiros` | `number` | **Required**|



#### Deleta um veiculo, encontrado por Id:



```http
  DELETE | http://127.0.0.1:3000/api/v1/car/:id
```

#### Altera a descrição de um acessório do veiculo, caso digite a descrição atual, deleta o acessório, acessorio encontrado por Id e veiculo encontrado por Id:



```http
  PUT | http://127.0.0.1:3000/api/v1/car/:idVeiculo/acessorios/:idAcessorio
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |             
| `descricao` | `string` |  **Required**|



## Locadoras


#### Cadastra locadora:


```http
  POST | http://127.0.0.1:3000/api/v1/rental/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nome ` | `string` | **Required**. |                
| `cnpj`  | `string` | **Required, Unique**. |
| `atividades` | `string` | **Required**. |                
| `endereco` | `array` |  **Required, Unique** |
| `endereco.cep` | `string` | **Required** |
| `endereco.number` | `string` | **Required** |
| `endereco.complemento` | `string` |  |
| `endereco.isFilial` | `boolean` | **Required** |



#### Consulta todas as locadoras:



```http
  GET | http://127.0.0.1:3000/api/v1/rental/
```


#### Consulta locadora por parametros:


```http
  GET | http://127.0.0.1:3000/api/v1/rental/?paramKey=paramValue
  
```


#### Consulta um locadora por Id:



```http
  GET | http://127.0.0.1:3000/api/v1/rental/:id
```



#### Altera as propriedades de uma locadora, encontrada por Id:



```http
  PUT | http://127.0.0.1:3000/api/v1/rental/:id
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nome ` | `string` | **Required**. |                
| `cnpj`  | `string` | **Required, Unique**. |
| `atividades` | `string` | **Required**. |                
| `endereco` | `array` |  **Required, Unique** |
| `endereco.cep` | `string` | **Required** |
| `endereco.number` | `string` | **Required** |
| `endereco.complemento` | `string` |  |
| `endereco.isFilial` | `boolean` | **Required** |



#### Deleta uma locadora, encontrado por Id:



```http
  DELETE | http://127.0.0.1:3000/api/v1/rental/:id
```
