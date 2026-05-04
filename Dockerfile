# Usamos una imagen ligera de Node.js
FROM node:18-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código (backend y frontend)
COPY . .

# Exponemos el puerto que usa tu server.js
EXPOSE 3000

# Comando para arrancar la app
CMD ["node", "backend/server.js"]