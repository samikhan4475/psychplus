import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { useStore } from '../store'
import { Messages } from '../types'
import EmptyChatState from './empty-chat-state'
import { MessageItem } from './message-item'
import { MessageSeparator } from './message-separator'
import TeamsSection from './teams-section'

const RichTextEditor = dynamic(
  () =>
    import('../../../components/rich-text-editor/index.ts').then(
      (mod) => mod.RichTextEditor,
    ),
  { ssr: false },
)

const ChatSection = () => {
  const [selectedTeam, setSelectedTeam] = React.useState<string>('')
  const { messages } = useStore((state) => ({
    messages: state.messages,
  }))

  return (
    <Flex direction={'column'} justify={'center'} className="w-full">
      <Flex className="flex flex-1 px-3 py-2" direction="column">
        {messages.length === 0 ? (
          <EmptyChatState selectedTeam={selectedTeam} />
        ) : (
          <ScrollArea className="h-[52dvh]">
            {Object.entries(
              messages?.reduce((acc: Record<string, Messages[]>, item) => {
                const date = item?.date?.split('T')[0]
                if (!acc[date]) {
                  acc[date] = []
                }
                acc[date].push(item)
                return acc
              }, {}),
            ).map(([date, items]: [string, Messages[]]) => {
              return (
                <>
                  <MessageSeparator date={date} />
                  {items?.map((item: Messages) => (
                    <MessageItem key={item?.id} {...item} />
                  ))}
                </>
              )
            })}
          </ScrollArea>
        )}
      </Flex>
      <TeamsSection
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      <Flex
        className="border-pp-gray-2 mx-4 mb-4 mt-2 rounded-3 border-l border-r border-t"
        direction={'column'}
      >
        <Text className="p-3 text-2">
          to <span className="font-light text-gray-11">recipients</span>
        </Text>
        <Box className="relative">
          <RichTextEditor
            key="journal-rich-text-editor"
            value={''}
            onChange={(value) => console.log(value)}
            height="100px"
            placeholder="Send a message"
            style={{
              borderColor: 'rgb(221 221 227 / 1)',
              borderBottomRightRadius: '8px',
              borderBottomLeftRadius: '8px',
            }}
            baseStyes={{
              width: '100%',
            }}
          />
          <Button
            highContrast
            className="bg-pp-blue-3 text-white absolute bottom-2 right-2 font-light disabled:opacity-50"
            disabled
          >
            Send
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ChatSection
