# Build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --force or --legacy-peer-deps
COPY . .
EXPOSE 3000
ARG ENV=production
ENV NODE_ENV=production
CMD ["sh", "-c", "npm run start:$NODE_ENV"]
