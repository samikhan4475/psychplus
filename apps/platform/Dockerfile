# [peter] change to trigger clinical :) 2
FROM node:18-alpine AS base

# Prune workspace
FROM base AS pruner
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add turbo@1.10.6
COPY . .
RUN turbo prune --scope=@psychplus/platform-app --docker

# Install dependencies
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add pnpm@8.6.3
# [peter] temp until figured out: COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-*.yaml ./
RUN pnpm install --frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED 1

# Build
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo run build --filter=@psychplus/platform-app...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/platform/next.config.js .
COPY --from=builder /app/apps/platform/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/platform/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/platform/.next/static ./apps/platform/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/platform/public ./apps/platform/public

EXPOSE 3099
ENV PORT 3099

ENV APP_CODE p+platform-ui

CMD ["node", "apps/platform/server.js"]
