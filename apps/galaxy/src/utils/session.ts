const SESSION_REFRESH_THRESHOLD = 5 * 60 * 1000
const REFRESH_CHECK_INTERVAL = 10 * 1000

const shouldRefresh = (expires: Date) => {
  const now = new Date()
  const remaining =
    expires.getTime() - now.getTime() - SESSION_REFRESH_THRESHOLD
  return remaining <= 0
}

const getLoginRedirectUrl = (redirectPath?: string) => {
  return redirectPath ? `/login?next=${redirectPath}` : '/login'
}

export { shouldRefresh, REFRESH_CHECK_INTERVAL, getLoginRedirectUrl }
