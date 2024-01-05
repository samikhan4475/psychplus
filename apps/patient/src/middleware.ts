import { createMiddleware } from '@psychplus/auth'
import { wrapPath } from '@psychplus/utils/url'

const REQUIRE_AUTH = ['/Dashboard'].map(wrapPath)
const REQUIRE_ANON = [
  '/',
  '/login',
  '/signup',
  '/schedule-appointment',
  '/schedule-appointment/personal-details',
].map(wrapPath)

export const config = {
  matcher: '/((?!.*\\.).*)',
}

export const middleware = createMiddleware({
  index: wrapPath('/'),
  requireAuth: REQUIRE_AUTH,
  requireAnon: REQUIRE_ANON,
})
