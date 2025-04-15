'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { lockScreenAction } from '@/actions'
import { appendSearchParams } from '@/utils/params'

type LockScreenProviderProps = React.PropsWithChildren

export const LockScreenProvider = ({ children }: LockScreenProviderProps) => {
  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)
  const searchParams = useSearchParams()

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

  const lockScreen = () => {
    lockScreenAction(prevPathRef.current ?? '/')
  }

  return children
}
