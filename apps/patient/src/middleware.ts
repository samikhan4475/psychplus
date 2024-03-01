import { createMiddleware } from '@psychplus/auth'

const REQUIRE_AUTH = [
  '/dashboard',
  '/dashboard/schedule-appointment',
  '/schedule-appointment/insurance-payment',
  '/schedule-appointment/confirmation',
]
const REQUIRE_ANON = [
  '/',
  '/login',
  '/signup',
  '/schedule-appointment',
  '/schedule-appointment/personal-details',
]

export const config = {
  matcher: '/((?!.*\\.).*)',
}

export const middleware = createMiddleware({
  index: '/',
  requireAuth: REQUIRE_AUTH,
  requireAnon: REQUIRE_ANON,
})
