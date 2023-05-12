FROM node:latest

RUN apt-get update && apt-get install -y curl git vim \
    && curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
