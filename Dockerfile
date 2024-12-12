FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
