FROM node:12.0.0-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY packages/server/package.json /app/packages/server/

COPY packages/core-stack/package.json /app/packages/core-stack/
COPY packages/utils/package.json /app/packages/utils/
COPY packages/clicker-core/package.json /app/packages/clicker-core/
COPY packages/clicker-node/package.json /app/packages/clicker-node/

RUN yarn workspace @project/server install --production

COPY packages/server/ /app/packages/server

COPY packages/core-stack/ /app/packages/core-stack
COPY packages/utils/ /app/packages/utils
COPY packages/clicker-core/ /app/packages/clicker-core
COPY packages/clicker-node/ /app/packages/clicker-node

WORKDIR /app/packages/server

EXPOSE 8080

CMD ["yarn", "start"]
 