FROM node:21-alpine

LABEL authors="Michael Pesin <mikelpesin@gmail.com>"

WORKDIR app/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
