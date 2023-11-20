#!/bin/sh

reload_nginx() {  
  docker exec app-proxy /usr/sbin/nginx -s reload  
}

docker pull $1/youmee:latest
RUNNING_CONTAINER=$(docker container ls -f name=app -q)

cd ~/app
service_name=admin-app
old_container_id=$(docker ps -f name=$service_name -q | tail -n1)
docker-compose up -d --no-deps --scale $service_name=2 --no-recreate $service_name
new_container_id=$(docker ps -f name=$service_name -q | head -n1)
new_container_ip=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $new_container_id)
sleep 10
reload_nginx
echo "Waiting for container startup..."

echo "Deleting old container..."
docker stop $old_container_id
docker rm $old_container_id
docker-compose up -d --no-deps --scale $service_name=1 --no-recreate $service_name

 
  reload_nginx  

(test $? -eq 0 || echo "Failed to scale containers") > 2&