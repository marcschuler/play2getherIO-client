docker build -t play2gether.io-client .
docker run -d -p 127.0.0.1:3102:80/tcp --name play2gether.io-client play2gether.io-client
