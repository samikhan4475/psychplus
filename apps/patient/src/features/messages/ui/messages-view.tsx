'use client'

import React from 'react'
import { CareTeamMember } from '@psychplus-v2/types'
import { Button, Flex, Text } from '@radix-ui/themes'
import ChatHeadsSection from './chat-heads-section'
import ChatSection from './chat-section'

const MessagesView = ({ careTeam }: { careTeam: CareTeamMember[] }) => {
  return (
    <Flex
      my="6"
      className="border-pp-gray-2 ml-[128px] mr-[128px] w-[100%] rounded-[16px] border"
      direction="column"
    >
      <Flex
        align="center"
        justify="between"
        className="border-b-pp-gray-2 border-b p-4"
      >
        <Text className="text-4 font-medium">Messages</Text>
        <Button highContrast className="bg-pp-blue-3">
          + New Message
        </Button>
      </Flex>
      <Flex className="h-full w-full">
        <ChatHeadsSection />
        <ChatSection />
      </Flex>
    </Flex>
  )
}

export default MessagesView
