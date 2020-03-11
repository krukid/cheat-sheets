# k8s

all commands prefixed with an alias of `kubectl`

## get current context
k config current-context

## start local management proxy
k proxy

## apply config changes to current context
k apply -f some-config.yml

## work with secrets
k get secrets
k describe secret <secret-name>

## reload deployment
k patch deployment <deployment-name> -p  "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"

## force replace, delete and then re-create the resource. Will cause a service outage
k replace --force -f ./pod.json

## attach shell to kube pod container
k exec -it <pod-id> --container <container-id> /bin/sh

## create dockerhub credentials
kubectl create secret docker-registry regsecret -n somens --docker-username=... --docker-password=... --docker-email=...
