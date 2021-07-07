FROM node:14 as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN ls -lah
RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g @ionic/cli
COPY . .
RUN npm run build

FROM nginx:1.21-alpine
COPY ./config/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/www /usr/share/nginx/html
EXPOSE 3102
ENTRYPOINT ["nginx", "-g", "daemon off;"]
