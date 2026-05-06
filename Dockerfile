FROM node:18-slim

# Instalamos la versión exacta que pide tu package.json
RUN npm install -g pnpm@10.33.0 

WORKDIR /app

# Copiamos los archivos de dependencias
# Quitamos el pnpm-lock.yaml de aquí si no lo tienes en tu carpeta local
COPY package.json ./

# Instalamos sin el flag --frozen-lockfile para que lo genere él mismo
RUN pnpm install

# Copiamos el resto del código
COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]