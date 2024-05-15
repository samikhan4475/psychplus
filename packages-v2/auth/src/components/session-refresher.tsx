'use client'

import { useEffect, useState } from 'react'
import { refreshSessionAction } from '../actions'

/**
 * How often to run the session refresh interval
 */
const REFRESH_CHECK_INTERVAL = 10 * 1000

/**
 * Used to calculate the time at which to trigger a session refresh. For example,
 * if the session is set to expire in 30 minutes and `SESSION_REFRESH_THRESHOLD`
 * is set to 5 minutes, then the session refresh will be triggered 5 minutes before
 * the session expires, or 25 minutes from now.
 */
const SESSION_REFRESH_THRESHOLD = 5 * 60 * 1000

/**
 * A component that performs a silent session refresh based on a session's expiration time.
 * Use to ensure the session remains valid while the user is active and using the app.
 */
const SessionRefresher = ({
  expiry: initialExpiry,
  requireAuth,
  redirectUrl,
}: {
  expiry?: string
  requireAuth?: boolean
  redirectUrl: string
}) => {
  const [expiry, setExpiry] = useState(
    initialExpiry ? new Date(initialExpiry) : null,
  )

  useEffect(() => {
    if (!expiry) {
      return
    }

    const checkForRefresh = () => {
      if (shouldRefresh(expiry)) {
        clearInterval(interval)

        refreshSessionAction({ requireAuth, redirectUrl }).then((result) => {
          if (result) {
            setExpiry(new Date(result.accessTokenExpiry))
          }
        })
      }
    }

    const interval = setInterval(checkForRefresh, REFRESH_CHECK_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [expiry, requireAuth, redirectUrl])

  return null
}

/**
 * Given an expiration date representing a session's expiration time,
 * return whether or not the session needs to be refreshed based on
 * the current time and the `SESSION_REFRESH_THRESHOLD`.
 */
const shouldRefresh = (expires: Date) => {
  const now = new Date()
  const remaining =
    expires.getTime() - now.getTime() - SESSION_REFRESH_THRESHOLD
  return remaining <= 0
}

export { SessionRefresher }
