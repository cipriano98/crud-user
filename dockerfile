FROM node:16 AS build

WORKDIR /usr/crud-user

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/crud-user/dist/crud-user /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]