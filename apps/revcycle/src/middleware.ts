import { createMiddleware } from '@psychplus/auth'

const REQUIRE_AUTH = ['/']
const REQUIRE_ANON = ['/login']

export const config = {
  matcher: '/((?!.*\\.).*)',
}

export const middleware = createMiddleware({
  index: '/',
  requireAuth: REQUIRE_AUTH,
  requireAnon: REQUIRE_ANON,
})
