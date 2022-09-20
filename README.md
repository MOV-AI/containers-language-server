# Monaco Languages Server

## Intro

This repo creates a monaco language server which proxy request from browsers to the various languages servers, those use the [language server protocol](https://microsoft.github.io/language-server-protocol/).

For now it just uses a [Python language server](https://github.com/python-lsp/python-lsp-server) , with various customizations(check [Dockerfile](/Dockerfile) and [.flake8](/monaco-language-client/.flake8))

It was inspired by [Monaco-languageclient](https://github.com/TypeFox/monaco-languageclient)

## Instructions

This Monaco/Python Language Server  will expose its API on port `3333`

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
