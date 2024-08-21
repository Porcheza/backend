## Development ###
FROM node:20.11-alpine3.18 AS development

RUN apk update && apk add bash

WORKDIR /app/backend

COPY ./package*.json ./

RUN npm install

COPY . .

## Build ###
FROM development as build

RUN npm run build

CMD ["node", "dist/main"]