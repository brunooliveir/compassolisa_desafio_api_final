
# compassolisa_desafio_api_final_pt1

O desafio consiste em criar uma aplicação API Rest Full de uma Locadora de veículos utilizando o framework express e o banco de dados MongoDB.




## Como rodar a API

Requisitos: Node.js e MongoDB


Após clonar o repositório

Em: **compassolisa_desafio_api_final_pt1/src/config/config.json**

**configure:** 

```http
{
    "database": {
        "port": "3000",
        "host": "127.0.0.1:27017",
        "collection": "compassolisa"
    }
}
```

**Nome do banco de dados a seu critério.

Abra a pasta raiz da aplicação (compassolisa_desafio_api_final_pt1), então execute no console os seguintes comandos:


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


# Rotas

## Veiculos


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



