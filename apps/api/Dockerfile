FROM node:18-alpine AS base

# Prune workspace
FROM base AS pruner
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add turbo@1.10.6
COPY . .
RUN turbo prune --scope=@psychplus/backend --docker

# Install dependencies
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add pnpm@8.6.3
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-*.yaml .
RUN pnpm install --frozen-lockfile

# Build
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo run build --filter=@psychplus/backend...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=builder /app .

EXPOSE 80
ENV PORT 80

CMD ["node", "apps/api/dist/index.js"]
