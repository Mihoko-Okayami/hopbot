FROM node:alpine

LABEL maintainer="Mihoko-Okayami (https://hub.docker.com/r/mihokookayami/hopbot/)"

ENV NODE_PATH=/usr/local/lib/node_modules

RUN set -eux; \
	apk add --no-cache --virtual .build-dependencies autoconf automake build-base python3; \
	npm install axios bufferutil discord.js figlet pm2 utf-8-validate zlib-sync -g; \
	apk del .build-dependencies; \
	rm -rf /tmp/* /var/cache/apk/*

WORKDIR /data

CMD pm2-runtime start index.js --name HopBot --output hopbot.log