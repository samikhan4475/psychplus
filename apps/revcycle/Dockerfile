FROM node:18.19-alpine AS alpine

# Setup pnpm on alpine base
FROM alpine AS base
    ENV PNPM_HOME="/pnpm"
    ENV PATH="$PNPM_HOME:$PATH"
    RUN corepack enable
    RUN pnpm install turbo --global

# Prune workspace
FROM base AS pruner
    # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
    RUN apk update && apk add --no-cache libc6-compat
    WORKDIR /app
    COPY . .
    RUN turbo prune --scope=@psychplus/revcycle-app --docker

# Build app
FROM base AS builder
    RUN apk update && apk add --no-cache libc6-compat
    WORKDIR /app

    # First install the dependencies (as they change less often)
    # [peter] temp until figured out: COPY .gitignore .gitignore
    COPY --from=pruner /app/out/json/ .
    COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
    COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
    RUN pnpm install --frozen-lockfile

    ENV NEXT_TELEMETRY_DISABLED 1

    # Build
    COPY --from=pruner /app/out/full/ .
    COPY turbo.json turbo.json

    # Uncomment and use build args to enable remote caching
    # ARG TURBO_TEAM
    # ENV TURBO_TEAM=$TURBO_TEAM

    # ARG TURBO_TOKEN
    # ENV TURBO_TOKEN=$TURBO_TOKEN

    ENV APP_CODE p+revcycle-app
    ENV APP_PATH revcycle

    RUN turbo run build --filter=@psychplus/revcycle-app...

# Run app
FROM alpine AS runner
    WORKDIR /app

    # Don't run production as root
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    USER nextjs

    COPY --from=builder /app/apps/revcycle/next.config.js .
    COPY --from=builder /app/apps/revcycle/package.json .

    # Automatically leverage output traces to reduce image size
    # https://nextjs.org/docs/advanced-features/output-file-tracing
    COPY --from=builder --chown=nextjs:nodejs /app/apps/revcycle/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/apps/revcycle/.next/static ./apps/revcycle/.next/static
    COPY --from=builder --chown=nextjs:nodejs /app/apps/revcycle/public ./apps/revcycle/public

    EXPOSE 3002
    ENV PORT 3002

    CMD ["node", "apps/revcycle/server.js"]
