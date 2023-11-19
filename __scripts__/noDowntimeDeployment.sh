#!/bin/sh

docker pull $1/youmee:latest
RUNNING_CONTAINER=$(docker container ps -q | wc -l | grep $1/youmee)

if [[ -z $RUNNING_CONTAINER ]]; then 
    echo "No running container found. Starting containers..."
    docker-compose up -d
else 
    echo "Containers already running. Attempting hot reload..."
    docker-compose scale web=2 --no-recreate
fi

sleep 10
docker rm -f youmee_old
docker-compose up -d -f ../docker --scale web=1 --no-recreate
