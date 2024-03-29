#! /bin/bash
set -x

APP_NAME="lsp-dev-env"

docker run -it \
--rm \
--network=host \
--name="$APP_NAME" \
-v $(pwd):/opt/app \
-v ~/.ssh:/home/node/.ssh \
lsp-dev-env bash -c "yarn prod"
