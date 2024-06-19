# Usar uma imagem do Node.js como base
FROM node:18-alpine as build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY . .

# Instalar as dependências do projeto
RUN npm install

# Construir o projeto React
RUN npm run build

# Usar uma imagem do Nginx para servir a aplicação
FROM nginx:1.21-alpine

# Copiar os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta que o Nginx utiliza
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]