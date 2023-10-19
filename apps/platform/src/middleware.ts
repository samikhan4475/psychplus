import { createMiddleware } from '@psychplus/middleware'

const REQUIRE_AUTH = ['/', '/widgets', '/components']
const REQUIRE_ANON = ['/login']

export const config = {
  matcher: '/((?!.*\\.).*)',
}

export const middleware = createMiddleware({
  index: '/',
  requireAuth: REQUIRE_AUTH,
  requireAnon: REQUIRE_ANON,
})
