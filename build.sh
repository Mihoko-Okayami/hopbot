#!/bin/sh

docker build --network host -t mihokookayami/hopbot:latest -f Dockerfile .
docker push mihokookayami/hopbot:latest
