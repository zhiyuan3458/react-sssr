FROM node:11

WORKDIR /usr/src/app
COPY package*.json ./
COPY dist ./
COPY ./src/server/server.js ./
RUN npm install
EXPOSE 80
CMD ['cross-env', 'NODE_ENV=production', 'node', 'server.js']

