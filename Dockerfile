FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY bundle.js ./

EXPOSE 8000

ENTRYPOINT [ "node" ]

CMD [ "bundle.js" ]