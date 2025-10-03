FROM node:18-alpine as build

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY bun.lockb ./

# Instalar dependências com npm (ignora bun.lockb)
RUN npm install

# Copiar código fonte
COPY . .

# Build da aplicação
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Servidor nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração nginx
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]