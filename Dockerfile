FROM node:16.11.0

RUN apt-get update -y

RUN apt-get install -y curl openjdk-11-jre-headless
