FROM node:14 as builder
COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g ionic
RUN ionic build --prod

FROM nginx:alpine
COPY ./config/nginx.conf /etc/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder www /usr/share/nginx/html
EXPOSE 3102
ENTRYPOINT ["nginx", "-g", "daemon off;"]
