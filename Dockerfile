FROM node:11.11-alpine as builder

WORKDIR /app

COPY srcs /app/srcs
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

RUN npm install \
    && npm run build

FROM node:11.11-alpine

ARG commit_hash=NONE

WORKDIR /app

COPY --from=builder /app/dist dist
COPY --from=builder /app/package.json package.json

RUN npm install --production

# Version
ENV NODE_API_PAYMENT_COMMIT_HASH $commit_hash

ENV NODE_API_PAYMENT_LISTEN_PORT 3000

ENV NODE_API_PAYMENT_LOGGER_LEVEL info
ENV NODE_API_PAYMENT_LOGGER_PRETTYPRINT false
ENV NODE_API_PAYMENT_LOGGER_CONSOLE true
ENV NODE_API_PAYMENT_LOGGER_SENTRY_ENABLE false

EXPOSE 3000

CMD ["npm", "run", "start"]
