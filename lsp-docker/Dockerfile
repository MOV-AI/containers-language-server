ARG VARIANT=3.9-buster
FROM "python":${VARIANT}

LABEL description="Python Language Server"
LABEL maintaner="frontend@mov.ai"

# install python language server
RUN apt-get update
RUN apt-get install nano

RUN python3 -m pip install --upgrade pip

RUN python3 -m pip install jedi pyflakes yapf pycodestyle python-lsp-server
RUN python3 -m pip install 'python-lsp-server[all]'

# install node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION 16.2.0
RUN . "$NVM_DIR/nvm.sh" \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# install yarn
RUN npm install --global yarn

WORKDIR /opt/app