import { createMiddleware } from '@psychplus/auth'

const REQUIRE_AUTH = [
  '/dashboard',
  '/schedule-appointment/insurance-payment',
  '/schedule-appointment/confirmation',
]
const REQUIRE_ANON = ['/', '/login', '/signup']

export const config = {
  matcher: '/((?!.*\\.).*)',
}

export const middleware = createMiddleware({
  index: '/',
  requireAuth: REQUIRE_AUTH,
  requireAnon: REQUIRE_ANON,
})
