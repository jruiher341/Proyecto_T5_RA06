# Usamos una imagen ligera de Node.js
FROM node:18-slim

# Instalamos pnpm
RUN npm install -g pnpm@10.33.0

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Instalamos las dependencias
RUN pnpm install --frozen-lockfile

# Copiamos el resto del código (backend y frontend)
COPY . .

# Exponemos el puerto que usa tu server.js
EXPOSE 3000

# Comando para arrancar la app
CMD ["node", "backend/server.js"]