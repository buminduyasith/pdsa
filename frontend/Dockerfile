FROM node:18.3.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["npm", "run", "start"]