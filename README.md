# Monaco/Python Language Server

## Instructions

This Monaco/Python Language Server  will expose its API on port 3333

### Build the docker image

```
docker build . --no-cache -t lsp-dev-env:latest
```

### Run the container

```
docker run -it lsp-dev-env:latest
```

### Develop the container application
Edit the content of folder `./monaco-language-client` and then run :

```
./lsp-docker/run.sh
```

>  You can also edit the content of folder `./monaco-language-client` while the container is running

### Install and run
Once inside the container's directory `/opt/app/monaco-language-client`:

```
yarn prod
```
