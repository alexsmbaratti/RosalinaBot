FROM node:8.10.0

LABEL description="RosalinaBot"

# Set Environment Variables
ENV NODE_VERSION=8.10.0
ENV PLATFORM="Docker"
ENV TIMEZONE=America/Los_Angeles
# Make sure to set TOKEN env with command line!

USER root

WORKDIR /app

RUN ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime && echo $TIMEZONE > /etc/timezone

# Install dev tools
RUN apt-get -y update && apt-get -y install wget nano npm curl mongodb ca-certificates rsync git

# Copy Dependencies
COPY package.json /app

# Install Dependencies
RUN npm install

# Copy Repository
COPY . /app

# Run RosalinaBot
CMD node app.js
