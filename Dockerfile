FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Executa o servidor de desenvolvimento
CMD ["npm", "run", "dev"]