FROM node:14.15.0-stretch

WORKDIR /usr/src/app

COPY . .

RUN yarn add expo-cli

RUN yarn

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD [ "yarn", "start" ]