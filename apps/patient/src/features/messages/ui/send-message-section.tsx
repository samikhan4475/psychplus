import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { CareTeamMember } from '@psychplus-v2/types'
import { sanitizeFormData } from '@psychplus-v2/utils'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useToast } from '@/providers'
import { createSecureMessage } from '../actions'
import { useStore } from '../store'
import { UserGroup } from '../types'
import { renderTeamIcon } from '../utils'

const RichTextEditor = dynamic(
  () =>
    import('../../../components/rich-text-editor/index.ts').then(
      (mod) => mod.RichTextEditor,
    ),
  { ssr: false },
)

const SendMessageSection = ({
  careTeam,
  selectedTeam,
  userGroups,
}: {
  careTeam: CareTeamMember[]
  selectedTeam: string
  userGroups: UserGroup[]
}) => {
  const [message, setMessage] = useState('')

  const { toast } = useToast()

  const {
    messages,
    setMessages,
    setChatHeads,
    chatHeads,
    inboxId,
    groupId,
    isNewChat,
    setIsInboxActive,
    setIsNewChat,
  } = useStore((state) => ({
    messages: state.messages,
    isInboxActive: state.isInboxActive,
    setMessages: state.setMessages,
    chatHeads: state.chatHeads,
    setChatHeads: state.setChatHeads,
    inboxId: state.inboxId,
    groupId: state.groupId,
    isNewChat: state.isNewChat,
    setIsNewChat: state.setIsNewChat,
    setIsInboxActive: state.setIsInboxActive,
  }))

  const renderSelectedTeam = () => {
    if (!selectedTeam) {
      return <span className="font-light text-gray-11">recipients</span>
    }

    if (selectedTeam === 'treatment') {
      return careTeam.map((member) => (
        <span className="border-pp-gray-2 rounded-3 border p-1" key={member.id}>
          {member.staffDetails.legalName.firstName}{' '}
          {member.staffDetails.legalName.lastName}
        </span>
      ))
    }

    const teamText =
      selectedTeam === 'scheduling' ? 'Scheduling Team' : 'Billing Team'

    return (
      <span className="border-pp-gray-2 rounded-3 border p-1">{teamText}</span>
    )
  }

  const renderTeamName = () => {
    if (selectedTeam === 'treatment') {
      return 'Treatment Team'
    }

    if (selectedTeam === 'scheduling') {
      return 'Scheduling Team'
    }

    return 'Billing Team'
  }

  const handleSendMessage = async () => {
    const group = userGroups.find((group: UserGroup) =>
      group.userGroupType.toLowerCase().includes(selectedTeam.toLowerCase()),
    )?.id
    let data
    if (inboxId) {
      data = {
        text: message,
        messageStatus: 'Success',
        MessageType: 'SecureChat',
        IsForTreatmentTeam: groupId ? false : true,
        GroupId: groupId,
        ConversationId: inboxId,
      }
    } else {
      data = {
        text: message,
        messageStatus: 'Success',
        MessageType: 'SecureChat',
        IsForTreatmentTeam: selectedTeam === 'treatment',
        GroupId: selectedTeam === 'treatment' ? '' : group,
      }
    }
    const filteredData = sanitizeFormData(data)
    const res = await createSecureMessage(filteredData)
    if (res.state === 'error') {
      return toast({
        type: 'error',
        title: res.error,
      })
    }

    if (!inboxId) {
      const newChat = [
        {
          id: res.data.id,
          name: renderTeamName(),
          role: '',
          message: message,
          time: 'Just now',
          isUnread: false,
          icon: renderTeamIcon(selectedTeam),
          isTeam: selectedTeam === 'treatment',
        },
        ...chatHeads,
      ]
      setChatHeads(newChat)
    }
    const newMessages = [
      ...messages,
      {
        id: res.data.id,
        name: 'You',
        message: message,
        date: new Date().toISOString(),
        isMine: true,
        attachments: [],
      },
    ]
    setIsNewChat(false)
    setIsInboxActive(false)
    setMessages(newMessages)
    setMessage('')
  }

  return (
    <Flex
      className="border-pp-gray-2 mx-4 mb-4 mt-2 rounded-3 border-l border-r border-t"
      direction={'column'}
    >
      {isNewChat && (
        <Text className="p-3 text-2">to {renderSelectedTeam()}</Text>
      )}
      <Box className="relative">
        <RichTextEditor
          key="journal-rich-text-editor"
          value={message}
          onChange={(value) => {
            setMessage(value)
          }}
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
          maxLength={1500}
          maxLengthStyles={{
            right: '85px',
          }}
        />
        <Button
          highContrast
          className="bg-pp-blue-3 text-white absolute bottom-2 right-2 font-light disabled:opacity-50"
          disabled={!message}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Flex>
  )
}

export default SendMessageSection
