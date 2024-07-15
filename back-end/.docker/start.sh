#!/bin/bash

echo "Instalando dependências do npm."
npm install --legacy-peer-deps

echo "Iniciando testes e2e."
npm run test:e2e

echo "Iniciando coverage."
npm run test:cov

echo "Iniciando projeto Nest."
npm run start:dev
