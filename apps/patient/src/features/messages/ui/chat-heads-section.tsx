'use client'

import React from 'react'
import Image from 'next/image'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Dot } from 'lucide-react'
import { InfoIcon, TreatmentTeamIcon } from '@/components-v2'
import EmptyChatHeadState from './empty-chat-head-state'

const chatData = [
  {
    id: 1,
    name: 'Treatment Team',
    role: '',
    message:
      'Hey Jordan, I reviewed the med log. Let me know if anything still looks off befor...',
    time: '5 min ago',
    isUnread: true,
    icon: <TreatmentTeamIcon width="20" height="20" fill="#6E56CF" />,
    isTeam: true,
  },
  {
    id: 2,
    name: 'Owen Bennett',
    role: 'Billing Team',
    message:
      'Following up on yesterday’s session. Should we flag this for clinical review?',
    time: '2hr ago',
    isUnread: true,
    avatar: '/images/provider-avatar.jpg',
    isOnline: true,
  },
  {
    id: 3,
    name: 'Lina Tran',
    role: 'Scheduling',
    message:
      'Hey! Just sent over my edits to the draft care plan. Looks solid otherwise.',
    time: '4hr ago',
    isUnread: true,
    avatar: '/images/provider-avatar.jpg',
    isOnline: false,
  },
  {
    id: 4,
    name: 'Ethan Rivera',
    role: 'Scheduling',
    message:
      'Can you confirm if the new intake form includes the dietary section?',
    time: '4hr ago',
    isUnread: false,
    avatar: '/images/provider-avatar.jpg',
    isOnline: true,
  },
]

const ChatHeadsSection = () => {
  const hasChats = chatData.length > 0

  if (!hasChats) {
    return <EmptyChatHeadState />
  }

  return (
    <Flex
      className="border-r-pp-gray-2 w-[400px] overflow-y-auto border-r py-4"
      direction="column"
    >
      {chatData.map((chat) => (
        <Flex
          key={chat.id}
          className="border-pp-gray-2 mb-4 border-b px-2"
          align={'start'}
          gap={'3'}
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
          {chat.isTeam ? (
            <Box className="rounded-full border-pp-gray-2 border bg-[#F5F2FF] p-2">
              {chat.icon}
            </Box>
          ) : (
            <Box className="relative h-10 w-10">
              <Image
                src={chat.avatar || '/avatars/owen.jpg'}
                alt={chat.name}
                className="rounded-full"
                width={40}
                height={40}
              />
              <span
                className={`rounded-full border-white absolute bottom-0 right-0 block h-[13px] w-[13px] border-2 ${
                  chat.isOnline ? 'bg-pp-success-1' : 'bg-pp-gray-3'
                }`}
              />
            </Box>
          )}
          <Box className="flex-1 pb-3">
            <Flex align={'center'} justify={'between'}>
              <Flex gap={'2'} align={'center'}>
                <Text className="text-2 font-medium">{chat.name}</Text>
                {chat.isTeam && <InfoIcon fill="#575759" />}
              </Flex>
              <Text className="text-pp-gray-1 text-1">{chat.time}</Text>
            </Flex>
            {chat.role && (
              <Text className="text-pp-gray-1 text-1">{chat.role}</Text>
            )}
            <Text className="text-pp-gray-1 line-clamp-1 text-2">
              {chat.message}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  )
}

export default ChatHeadsSection
