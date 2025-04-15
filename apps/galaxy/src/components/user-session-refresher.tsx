'use client'

import { useEffect, useState } from 'react'
import { refreshSessionAction } from '@/actions/refreshSessionAction'
import { REFRESH_CHECK_INTERVAL, shouldRefresh } from '@/utils'

const UserSessionRefresher = ({
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

export { UserSessionRefresher }
