'use client'

import React, { useEffect } from 'react'
import { CareTeamMember } from '@psychplus-v2/types'
import { Flex } from '@radix-ui/themes'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEventType } from '@/types'
import { useStore } from '../store'
import { UserGroup } from '../types'
import ChatHeaderSection from './chat-header-section'
import ChatHeadsSection from './chat-heads-section'
import ChatSection from './chat-section'

const MessagesView = ({
  careTeam,
  userGroups,
}: {
  careTeam: CareTeamMember[]
  userGroups: UserGroup[]
}) => {
  const { getChats } = useStore((state) => ({
    getChats: state.getChats,
  }))

  useEffect(() => {
    const handleInboxCount = (message: any) => {
      return
    }

    webSocketEventBus.on(
      WebSocketEventType.SecureChatNotification,
      handleInboxCount,
    )

    getChats()

    return () => {
      webSocketEventBus.off(
        WebSocketEventType.SecureChatNotification,
        handleInboxCount,
      )
    }
  }, [])

  return (
    <Flex
      my="6"
      className="border-pp-gray-2 ml-[128px] mr-[128px] h-[825px] w-[100%] rounded-[16px] border"
      direction="column"
    >
      <ChatHeaderSection />
      <Flex className="h-full w-full">
        <ChatHeadsSection userGroups={userGroups} />
        <ChatSection careTeam={careTeam} userGroups={userGroups} />
      </Flex>
    </Flex>
  )
}

export default MessagesView
