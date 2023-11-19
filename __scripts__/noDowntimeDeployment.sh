#!/bin/sh

docker pull $1/youmee:latest
RUNNING_CONTAINER=$(docker container ls -f name=app -q)

if [[ -z $RUNNING_CONTAINER ]]; then 
    echo "No running container found. Starting containers..."
    docker-compose -f ../docker-compose.yaml up -d
    test $? -eq 0 || echo "Failed to start containers"
else 
    echo "Containers already running. Attempting hot reload..."
    docker-compose scale youmee_admin=2 --no-recreate
fi

sleep 10
docker rm -f youmee_old
docker-compose -f ../docker-compose.yaml up -d --scale youmee_admin=1 

test $? -eq 0 || echo "Failed to scale containers"