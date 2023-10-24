# Stage 1: install dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json .
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN npm ci

# Stage 2: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app ./app
COPY public ./public
COPY prisma ./prisma
COPY package-lock.json package.json next.config.js middleware.ts postcss.config.js tailwind.config.js tsconfig.json ./
RUN npm run build

# Stage 3: run
FROM node:18-alpine
WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET $NEXTAUTH_SECRET

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# RUN --mount=type=secret,id=DATABASE_URL \
#   --mount=type=secret,id=NEXTAUTH_SECRET \
#    export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
#    export NEXTAUTH_SECRET=$(cat /run/secrets/NEXTAUTH_SECRET) && \

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]