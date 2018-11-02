docker images
docker ps -a
docker run -it --rm --name=container_name image_name bash
docker attach running_container_name
docker exec -it running_container_name bash
docker start -ai stopped_container_name bash
docker stop running_container_name
docker kill running_container_name

# removes mounted volumes
docker rm -v container_name

docker rmi image_name
docker volume rm $(docker volume ls -q)

# remove all containers
docker rm -v $(docker ps -aq)

# list all container ids
docker ps -aq

# find container by name/status/image
docker ps -f name=container_name
docker ps -f status=running -f status=exited -f status=created
docker ps -f ancestor=image_name

# find image by name
docker images image_name

# find image id by name
docker images -q image_name

# save container changes to image (replace);
# keep in mind that "docker run" commands alter Dockerfile's CMD statement
docker commit --change='CMD ["foo", "bar"]' container_name image_name

docker port container_name
docker logs -f container_name

# remove all exited containers except some
docker rm $(docker ps -f status=exited | tail -n +2 | grep -vE "YOUR_REGEXP_HERE" | cut -d " " -f 1)

# remove dangling images
docker rmi $(docker images -qf dangling=true)

# cleanup volumes, images and containers
docker rm $(docker ps -aq -f status=exited -f status=created)
docker rmi $(docker images -qf dangling=true)
docker volume rm $(docker volume ls -qf dangling=true)

# remove images by grep
docker images | grep arbitrumserver_ | awk '{print $3}' | xargs docker rmi
