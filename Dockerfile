FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent \
  && npm run frontend-install --silent \
  && npm run build --prefix frontend

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
