'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Dot } from 'lucide-react'
import { useProfileStore } from '@/features/account/profile/store'
import { useStore } from '../store'
import { ChatHeadTypes, UserGroup } from '../types'
import { getPlainText, renderTeamIcon } from '../utils'
import EmptyChatHeadState from './empty-chat-head-state'

const ChatHeadsSection = ({ userGroups }: { userGroups: UserGroup[] }) => {
  const { chatHeads, getMessages } = useStore((state) => ({
    chatHeads: state.chatHeads,
    getMessages: state.getMessages,
  }))
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const hasChats = chatHeads.length > 0

  if (!hasChats) {
    return <EmptyChatHeadState />
  }

  function getChatIcon(
    chat: ChatHeadTypes,
    userGroups: UserGroup[],
    renderTeamIcon: (team: 'billing' | 'scheduling') => React.ReactNode,
  ) {
    if (chat.icon) {
      return (
        <Box className="rounded-full border-pp-gray-2 border bg-[#F5F2FF] p-2">
          {chat.icon}
        </Box>
      )
    }

    if (chat.avatar) {
      return (
        <Box className="relative h-10 w-10">
          <Image
            src={chat.avatar || '/avatars/owen.jpg'}
            alt={chat.name}
            className="rounded-full"
            width={40}
            height={40}
          />
          <span
            className={cn(
              `rounded-full border-white absolute bottom-0 right-0 block h-[13px] w-[13px] border-2`,
              chat.isOnline ? 'bg-pp-success-1' : 'bg-pp-gray-3',
            )}
          />
        </Box>
      )
    }

    const group = userGroups.find((group) => group.id === chat.groupId)
    const isBilling = group?.userGroupType
      ?.toLocaleLowerCase()
      ?.includes('billing')

    return (
      <Box className="rounded-full border-pp-gray-2 border bg-[#F5F2FF] p-2">
        {isBilling ? renderTeamIcon('billing') : renderTeamIcon('scheduling')}
      </Box>
    )
  }

  return (
    <Flex
      className="border-r-pp-gray-2 h-[749px] w-[400px] overflow-y-auto border-r py-4"
      direction="column"
    >
      {chatHeads.map((chat) => (
        <Flex
          key={chat.id}
          className="border-pp-gray-2 mb-4 cursor-pointer border-b px-2"
          align={'start'}
          gap={'3'}
          onClick={() =>
            getMessages(
              chat.conversationId ? chat.conversationId : chat.id,
              profile.userId,
            )
          }
        >
          <Box className="w-[10px] text-center">
            {chat.isUnread && (
              <Dot
                className="text-pp-blue-3 fill-pp-blue-3"
                height={'30'}
                width={'30'}
              />
            )}
          </Box>
          {getChatIcon(chat, userGroups, renderTeamIcon)}
          <Box className="flex-1 pb-3">
            <Flex align={'center'} justify={'between'}>
              <Flex gap={'2'} align={'center'}>
                <Text className="text-2 font-medium">{chat.name}</Text>
              </Flex>
              <Text className="text-pp-gray-1 text-1">{chat.time}</Text>
            </Flex>
            {!chat.isTeam && chat.role && (
              <Text className="text-pp-gray-1 text-1">{chat.role}</Text>
            )}
            <Text className="text-pp-gray-1 line-clamp-1 text-2">
              {getPlainText(chat.message)}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  )
}

export default ChatHeadsSection
