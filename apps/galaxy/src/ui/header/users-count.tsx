'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEventType } from '@/types'

const UsersCount = () => {
  const [userCount, setUserCount] = useState<number>()

  useEffect(() => {
    const handleUserCountMessage = (message: { lv?: number }) => {
      setUserCount(message.lv ?? 0)
    }

    webSocketEventBus.on(WebSocketEventType.Users, handleUserCountMessage)
    return () => {
      webSocketEventBus.off(WebSocketEventType.Users, handleUserCountMessage)
    }
  }, [])

  if (userCount === undefined) return null
  return (
    <Flex
      className="min-w-9 rounded-full text-sm text-gray-800 bg-white shadow-sm h-9 border font-medium"
      justify="center"
      align="center"
      px="3"
    >
      {userCount ?? ''}
    </Flex>
  )
}

export { UsersCount }
