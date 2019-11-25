FROM node:10.13.0-alpine

COPY . /app
WORKDIR /app
ENV NODE_ENV=production
RUN npm install  \
  && npm run frontend-install \
  && npm run build --prefix frontend

EXPOSE 5000/tcp

CMD ["npm", "start"]

# RUN npm run postinstall

# ARG DATABASE_URL="mongodb://mongo_db/nodeapp"
# ARG RAILS_ENV=production
# WORKDIR /my_app/frontend

# RUN npm install && npm run build
# COPY . /my_app

# COPY --from=build /usr/src/node_app/app/assets/javascripts/bundle.js ./app/assets/javascripts/
# COPY --from=build /usr/src/node_app/app/assets/javascripts/bundle.js.map ./app/assets/javascripts/

# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh

# EXPOSE 3000