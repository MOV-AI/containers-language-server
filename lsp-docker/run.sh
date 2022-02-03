#! /bin/bash
set -x

APP_NAME="lsp-dev-env"

docker run -ti \
--rm \
--network=host \
--name="$APP_NAME" \
-v $(pwd):/opt/app \
-v ~/.ssh:/home/node/.ssh \
--entrypoint bash \
lsp-dev-env
