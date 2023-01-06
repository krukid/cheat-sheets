## list containers and their ips

    docker ps -q | xargs -n 1 docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}} {{ .Name }}' | sed 's/ \// /'

## remove dangling networks

    docker network ls -q -f danging=true | xargs -n 1 docker network rm

