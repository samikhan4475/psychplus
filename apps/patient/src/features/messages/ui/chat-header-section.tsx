import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useStore } from '../store'

const ChatHeaderSection = () => {
  const { setIsInboxActive, setInboxId, setIsNewChat } = useStore((state) => ({
    setIsInboxActive: state.setIsInboxActive,
    setInboxId: state.setInboxId,
    setIsNewChat: state.setIsNewChat,
  }))

  const handleCreateMessage = async () => {
    setIsInboxActive(false)
    setIsNewChat(true)
    setInboxId('')
  }

  return (
    <Flex
      align="center"
      justify="between"
      className="border-b-pp-gray-2 border-b p-4"
    >
      <Text className="text-4 font-medium">Messages</Text>
      <Button
        highContrast
        className="bg-pp-blue-3"
        onClick={handleCreateMessage}
      >
        + New Message
      </Button>
    </Flex>
  )
}

export default ChatHeaderSection
