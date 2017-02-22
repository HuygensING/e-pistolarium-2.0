FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y git build-essential curl

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

RUN git clone https://github.com/huygensing/e-pistolarium-2.0.git #2

WORKDIR /e-pistolarium-2.0

RUN npm install
RUN npm run build
RUN npm run server