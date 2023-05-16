FROM node

WORKDIR /frontend/

COPY ./package.json /frontend/

RUN yarn install

COPY . /frontend/

CMD yarn dev