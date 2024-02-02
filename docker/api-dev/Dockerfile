FROM node:20.11.0-alpine
WORKDIR /usr/template-2

COPY package.json /usr/template-2/package.json
COPY yarn.lock /usr/template-2/yarn.lock
COPY packages/common /usr/template-2/packages/common
COPY packages/ui /usr/template-2/packages/ui
COPY services/api/package.json /usr/template-2/services/api/package.json

RUN yarn ci

COPY services/api /usr/template-2/services/api

EXPOSE 1001

CMD ["yarn", "api", "dev:docker"]
