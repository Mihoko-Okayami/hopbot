#!/bin/sh

docker build --network host -t mihokookayami/mitsuha-miyamizu:latest -f Dockerfile .
docker push mihokookayami/mitsuha-miyamizu:latest
