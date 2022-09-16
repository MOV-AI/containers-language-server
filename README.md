# Monaco/Python Language Server example

## Instructions

### Build the docker image

```
docker build . --no-cache -t lsp-dev-env:latest
```

### Run the container

```
docker run --network=host -it lsp-dev-env:latest
```

### Develop the container application

Edit the content of folder `./monaco-language-client` and then run :

```
./lsp-dev/run.sh
```

> You can also edit the content of folder `./monaco-language-client` while the container is running
