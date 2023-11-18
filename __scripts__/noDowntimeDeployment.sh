#/bin/sh

docker pull $1/youmee:latest
RUNNING_CONTAINER=$(docker ps | grep $1/youmee)
if [[ -z $RUNNING_CONTAINER ]]; then docker-compose up -d; else docker-compose scale web=2 --no-recreate
sleep 10
docker rm -f youmee_old
docker-compose up -d --scale web=1 --no-recreate