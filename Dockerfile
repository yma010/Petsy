FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run heroku-postbuild

EXPOSE 5000

CMD ["npm", "start"]
