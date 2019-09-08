# desafio-infoGlobo
Desafio infoGlobo, crawler em NodeJS + Docker + Restify

## Instalação
Você pode rodar o projeto através do NodeJS ou através do Docker e Docker-compose.

#### NodeJS
Com o NodeJS instalado em sua máquina, após baixar o repositório basta entrar na raíz do projeto e executar os comandos abaixo para instalar as dependências e subir o projeto.

```
npm i
node index.js
```


#### Docker
Com o docker e/ou docker-compose instalado em sua máquina, após baixar o repositório basta entrar na raíz do projeto e executar os comandos abaixo para gerar a imagem e subir o container.

##### Criando a imagem e subindo o container com docker
```
docker build -t danielpinna/desafio-info-globo .
docker run -d --name desafioGlobo -p 3000:3000 danielpinna/desafio-info-globo
```

##### Parando o container e removendo com docker
```
docker container stop desafioGlobo
docker container rm desafioGlobo
```

##### Criando a imagem e subindo o container com docker-compose
```
docker-compose up
```

##### Parando o container e removendo com docker-compose
```
ctrl + c
docker-compose down
docker-compose stop
```


## APIs do projeto
* URL_BASE = http://localhost:3000

#### Login
* POST /auth
```
{
	"username": "infoglobo",
	"password": "admin123"
}
```

* GET /crawler

#### Adicionar
* POST /planets
Authorization: Bearer TOKEN (Obtido na API de login)
