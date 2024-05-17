FROM node:lts-alpine as build-stage

RUN mkdir -p /app
WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM caddy:alpine as production-stage
EXPOSE 80
EXPOSE 443
COPY --from=build-stage /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile