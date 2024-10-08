FROM node:22.7-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
# Create database folder. This is needed in the build step for some reason???
RUN mkdir database
RUN npm run build
RUN npm prune --production

FROM node:22.7-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
# Create database folder
RUN mkdir database
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]