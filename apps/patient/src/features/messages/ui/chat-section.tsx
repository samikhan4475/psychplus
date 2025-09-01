import React from 'react'
import { CareTeamMember } from '@psychplus-v2/types'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { useStore } from '../store'
import { Messages, UserGroup } from '../types'
import EmptyChatState from './empty-chat-state'
import { MessageItem } from './message-item'
import { MessageSeparator } from './message-separator'
import SendMessageSection from './send-message-section'
import TeamsSection from './teams-section'

const ChatSection = ({
  careTeam,
  userGroups,
}: {
  careTeam: CareTeamMember[]
  userGroups: UserGroup[]
}) => {
  const [selectedTeam, setSelectedTeam] = React.useState<string>('')
  const { messages, isInboxActive, isNewChat } = useStore((state) => ({
    messages: state.messages,
    isInboxActive: state.isInboxActive,
    isNewChat: state.isNewChat,
  }))

  return (
    <Box className="w-full">
      <Flex
        className={cn(
          'flex h-[550px] flex-1 px-3 py-2',
          messages.length > 0 && 'h-[585px]',
        )}
        direction="column"
      >
        {isNewChat || isInboxActive || messages?.length === 0 ? (
          <EmptyChatState selectedTeam={selectedTeam} />
        ) : (
          <ScrollArea className="h-full">
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
      <Flex
        direction={'column'}
        justify={'center'}
        className="h-[200px] w-full"
      >
        {isNewChat && (
          <TeamsSection
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        )}
        <SendMessageSection
          careTeam={careTeam}
          selectedTeam={selectedTeam}
          userGroups={userGroups}
        />
      </Flex>
    </Box>
  )
}

export default ChatSection
