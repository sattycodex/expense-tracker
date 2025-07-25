FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8080

ENV PORT=8080
ENV ACCESS_TOKEN_EXPIRES=100m
ENV REFRESH_TOKEN_EXPIRES=7d

CMD ["node", "server.js"]
