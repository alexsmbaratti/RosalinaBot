FROM ubuntu:16.04

LABEL description="RosalinaBot"

ENV NODE_VERSION=8.10.0

USER root

# Install dev tools
RUN apt-get -y update && apt-get -y install wget nano npm curl mongodb ca-certificates rsync git

# Install Node.js
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
RUN . "/root/.nvm/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "/root/.nvm/nvm.sh" &&  nvm use v${NODE_VERSION}
RUN . "/root/.nvm/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/
RUN /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm install  leasot@latest -g

# Copy Repository
RUN git clone https://github.com/alexsmbaratti/RosalinaBot.git
COPY config.json /RosalinaBot

# Install dependencies
RUN ["sh", "-c", "echo npm install" ]

# Run RosalinaBot
CMD node /RosalinaBot/app.js