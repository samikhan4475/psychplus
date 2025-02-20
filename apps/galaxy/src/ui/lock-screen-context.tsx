'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { lockScreenAction, logoutAction } from '@/actions'
import { refreshAccessToken } from '@/api/session'
import { appendSearchParams } from '@/utils/params'

export const LockScreenProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const timeoutId = setInterval(checkRefreshToken, 5 * 60 * 1000)
    return () => {
      clearInterval(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lockScreen = () => {
    lockScreenAction(prevPathRef.current ?? '/')
  }

  const checkRefreshToken = async () => {
    const refreshed = await refreshAccessToken()
    if (!refreshed) {
      const pathWithParams = appendSearchParams(
        prevPathRef.current,
        searchParams,
      )
      logoutAction(pathWithParams as string)
    }
  }

  useEffect(() => {
    const pathWithParams = appendSearchParams(pathname, searchParams)
    if (prevPathRef.current !== pathWithParams) {
      prevPathRef.current = pathWithParams
    }
  }, [pathname, searchParams])

  useEffect(() => {
    let timer: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(lockScreen, 10 * 60 * 6000) // 60 minutes
    }

    const activityEvents = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ]

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer),
    )

    resetTimer()

    return () => {
      clearTimeout(timer)
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer),
      )
    }
  }, [])

  return children
}
