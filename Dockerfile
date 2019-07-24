FROM node:8.10.0

LABEL description="RosalinaBot"

# Set Environment Variables
ENV NODE_VERSION=8.10.0
ENV PLATFORM="Docker"

USER root

WORKDIR /app

# Install dev tools
RUN apt-get -y update && apt-get -y install wget nano npm curl mongodb ca-certificates rsync git

# Copy Repository
COPY package.json /app
COPY . /app

# Install dependencies
RUN npm install

# Run RosalinaBot
CMD node app.js