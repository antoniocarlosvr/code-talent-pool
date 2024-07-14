FROM node:18.20.4-alpine3.20

WORKDIR /app

COPY ../package*.json ./

RUN npm install --legacy-peer-deps && npm cache clean --force

COPY ../ .

RUN npm run build

EXPOSE 3000

COPY ../.docker/start.sh .

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]