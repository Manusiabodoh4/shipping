FROM node:16.10.0-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN yarn install

COPY . /usr/src/app

CMD ["yarn", "start"]