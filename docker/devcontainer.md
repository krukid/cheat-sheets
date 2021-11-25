# devcontainer

Since docker encapsulates everything that we need for the app to run,
it makes sense to reuse that environment for all intents and purposes,
such as development, testing and production deployments.

The main distinction between these use cases should not be the environment,
but configuration and/or the code.

## best practices

1. setup rarely changing core stuff at the beginning of Dockerfile
  -- makes use of layer caching

2. merge RUN commands
  -- reduces layer count

3. create a docker-compose.yml for your dependencies, spool them up:

    docker-compose up

4. build your npm packages in a cached layer, copy over to app dir,
   mount your dev code in a separate dir, create a symbolic link to stored app;
   your mount code should create a temporary user with same uid/gid as host user
   to allow seamless editing of files generated from within the container
