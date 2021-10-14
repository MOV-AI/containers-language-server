# Example of how to connect MONACO Editor with a python language server

## Instructions

Build the docker image
run ./lsp-docker/.devcontainer/build.sh

Run a container
run ./lsp-docker/.devcontainer/run.sh

Enter the contaienr
docker exec -ti lsp-dev-env bash

enter the project example folder
cd monaco-languageclient/example

install with yarn
yarn && yarn prepare && yarn start:ext

open the browser on localhost:3000
you should now have a monaco editor with some json text
remove the json text and write some python code

it works!
