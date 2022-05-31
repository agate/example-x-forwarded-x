FROM node:lts-alpine

COPY .npmrc /app/
COPY ./index.js /app/
COPY ./package.json* /app/
WORKDIR /app
RUN npm install

CMD [ "node", "index.js" ]
