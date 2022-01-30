# Krok pierwszy - budowanie zależności
FROM node:latest as build-deps
WORKDIR /app

COPY package.json .
RUN yarn install

COPY public public
COPY src src
RUN yarn run build

# Krok drugi - przygotowanie środowiska produkcyjnego
FROM nginx:1.12-alpine
# Zmiana domyślnych ustawień NGINX, tak aby działał react-router
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80

# Dodanie skryptów, umożliwiających wskazywanie
# adresu API przez zmienne środowiskowe kontenera
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Dodanie basha, bo alpine nie posiada go domyślnie
RUN apk add --no-cache bash
RUN chmod +x env.sh

# Najpierw zostaje uruchomiony skrypt generujący plik ze zmiennymi środowiskowymi,
# a dopiero potem serwer NGINX
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
