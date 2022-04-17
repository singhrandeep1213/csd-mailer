FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /usr/app

COPY package.json index.js .

RUN npm install --quite

COPY . .