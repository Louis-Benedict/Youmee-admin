FROM node:18-alpine AS build
# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy and install the dependencies for the project
COPY package.json package-lock.json ./
RUN npm ci
# Copy all other project files to working directory
COPY . .
# Run the next build process and generate the artifacts
RUN npm run build