FROM node:14 as builder
COPY package.json package-lock.json ./
RUN npm install -g
RUN ionic build --prod
COPY www/* ./

FROM nginx:alpine
COPY ./config/nginx.conf /etc/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder ./ /usr/share/nginx/html
EXPOSE 3102
ENTRYPOINT ["nginx", "-g", "daemon off;"]
