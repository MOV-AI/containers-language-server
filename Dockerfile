ARG VARIANT=3.9-buster
FROM "python":${VARIANT}

LABEL description="Python Language Server"
LABEL maintaner="frontend@mov.ai"

ENV NODE_VERSION 16.2.0
ENV YARN_VERSION 1.22.19
ENV NVM_VERSION v0.39.0
ENV NPM_VERSION 8.19.2
ENV APP_PATH=/opt/app/monaco-language-client/
ENV NVM_DIR=/root/.nvm

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
# shellcheck source=/dev/null
RUN apt-get update && \
    apt-get install --no-install-recommends -y nano=3.2-3  && \
    python3 -m pip install --no-cache-dir --upgrade pip==22.2.2  && \
    # install python language server
    python3 -m pip install --no-cache-dir jedi==0.18.1 pyflakes==2.5.0 yapf==0.32.0 pycodestyle==2.9.1 flake8==5.0.4 pyls-flake8==0.4.0 && \
    python3 -m pip install --no-cache-dir 'python-lsp-server[all]==1.5.0' && \
    # install node
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install $NODE_VERSION &&\
    nvm alias default $NODE_VERSION &&\
    nvm use default && \
    npm install -g npm@$NPM_VERSION && \
    npm install -g yarn@YARN_VERSION &&\
    apt-get clean &&\
    rm -rf /var/lib/apt/lists/*

COPY monaco-language-client/ $APP_PATH

WORKDIR $APP_PATH
ENV NVM_DIR=/root/.nvm
ENV NODE_PATH=$NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN  yarn && yarn prepare

CMD ["yarn", "start:ext", "-sp", "languageServer", "-p", "3333" ]

EXPOSE 3333
