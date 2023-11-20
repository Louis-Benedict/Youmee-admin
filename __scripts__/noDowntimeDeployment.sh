#!/bin/sh

docker pull $1/youmee:latest
RUNNING_CONTAINER=$(docker container ls -f name=app -q)

cd ~/app

if [[ -z $RUNNING_CONTAINER ]]; then 
    echo "No running container found. Starting containers..."
    docker-compose -f ../docker-compose.yaml up -d
    (test $? -eq 0 || echo "Failed to start containers") > 2&
else 
    echo "Containers already running. Attempting hot reload..."
    docker-compose scale admin-app=2 --no-recreate
fi

echo "Waiting for container startup..."
sleep 10
echo "Deleting old container..."
docker rm -f app-admin-app-1
docker-compose -f ../docker-compose.yaml up -d --scale admin-app=1 
docker container prune -f

(test $? -eq 0 || echo "Failed to scale containers") > 2&