FROM node:18.20.4-alpine3.20 AS build

WORKDIR /app

COPY ../package*.json ./

RUN npm install --legacy-peer-deps && npm cache clean --force

COPY ../ .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/front-end /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]