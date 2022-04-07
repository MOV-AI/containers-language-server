# Monaco/Python Language Server example

## Instructions

### Build the docker image

```
(cd lsp-docker && ./build.sh)
```

### Run the container

```
./lsp-docker/run.sh
```

### Enter the project example folder

```
cd monaco-language-client
```

### Install and run

```
yarn && yarn prepare && yarn start:ext -sp languageServer -p 3333
```

