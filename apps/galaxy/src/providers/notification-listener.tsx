'use client'

import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEvents, WebSocketEventType } from '@/types'
import { getTruncatedName } from '@/utils/patient'

const NotificationProvider = () => {
  const callNotified = useRef<string[]>([])

  useEffect(() => {
    const callWaiting = (
      data: WebSocketEvents[WebSocketEventType.CallWaiting],
    ) => {
      if (callNotified.current.includes(data.gv)) {
        return
      }
      toast(
        `${getTruncatedName(
          data.sv || '',
        )} is waiting for you in the call queue.`,
        {
          icon: '📞',
        },
      )
      callNotified.current.push(data.gv)
    }

    webSocketEventBus.on(WebSocketEventType.CallWaiting, callWaiting)

    return () => {
      webSocketEventBus.off(WebSocketEventType.CallWaiting, callWaiting)
      callNotified.current = []
    }
  }, [])

  return null
}

export { NotificationProvider }
