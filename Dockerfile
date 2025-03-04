FROM node:23-alpine AS builder

WORKDIR /app
# --force is a temporary solution as svelte 5 is not yet fully supported
COPY package.json .
COPY package-lock.json .
RUN npm ci --force
COPY . .

RUN npm run build
RUN npm prune --production --force

FROM node:23-alpine
WORKDIR /app
COPY --from=builder /app/build/ build/
COPY --from=builder /app/node_modules/ node_modules/
COPY package.json .
EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "build" ]