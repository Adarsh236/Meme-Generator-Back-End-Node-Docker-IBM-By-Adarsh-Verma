FROM node:8.11.1

WORKDIR /usr/src/amemegeneratorapi

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]