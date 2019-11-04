FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --silent \
  && npm run frontend-install --silent \
  && npm run build --prefix frontend



EXPOSE 5000

CMD ["npm", "start"]
