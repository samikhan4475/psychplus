'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { lockScreenAction } from '@/actions'

export const LockScreenProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)
  const lockScreen = () => {
    lockScreenAction(prevPathRef.current ?? '/')
  }

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    let timer: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(lockScreen, 10 * 60 * 2000) // 20 minutes
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
