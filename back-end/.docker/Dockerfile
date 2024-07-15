# Use uma imagem base do Node.js
FROM node:18.20.4-alpine3.20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Certifique-se de que o script start.sh é executável
RUN chmod +x .docker/start.sh

# Exponha a porta que o aplicativo irá usar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:dev"]
