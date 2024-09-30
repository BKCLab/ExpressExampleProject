FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

ENTRYPOINT [ "npm" ]

CMD [ "start" ]