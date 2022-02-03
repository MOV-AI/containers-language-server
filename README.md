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
cd monaco-languageclient/example
```

### Install and run
```
yarn && yarn prepare && yarn start:ext
```

### Test
After opening the browser on localhost:3000, you should have monaco editor with some content. Replace the content with some python code to test.
