when mounting host directories inside a container it's convenient to map
the root user inside the container to a user on the host system, so
that files created in a mounted volume from within the container don't have
to be chown'ed on the host system.

this is somewhat tricky currently, but has to be done once on your development
machine:

1. pick a user from your host system that you want to map onto container's root user.
2. edit your /etc/subuid and /etc/subgid:

    <hostuser>:1000:1
    <hostuser>:10000:65535

3. add /etc/docker/daemon.json with the following content:

    {"userns-remap": "<hostuser>"}

4. sudo sysctl restart docker

related article: https://blog.yadutaf.fr/2016/04/14/docker-for-your-users-introducing-user-namespace/
