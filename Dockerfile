FROM node:10

MAINTAINER Daniel Pinna <danielpinna2@gmail.com>

WORKDIR /usr/app

COPY package.json .

RUN npm install -g nodemon

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]