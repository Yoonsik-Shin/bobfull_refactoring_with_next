FROM node

WORKDIR /backend/

COPY ./package.json /backend/

RUN yarn install

COPY . /backend/

CMD yarn start:dev