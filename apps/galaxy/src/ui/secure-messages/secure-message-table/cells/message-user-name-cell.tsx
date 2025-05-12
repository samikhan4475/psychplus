import React from 'react'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { useStore } from '../../store'
import { SecureMessage, SecureMessagesTab, SendMode } from '../../types'
import { getFullName } from '../../utils'

const MessageUserNameCell = ({ row }: { row: Row<SecureMessage> }) => {
  const { activeTab } = useStore((state) => state)

  const { channels, senderName } = row.original ?? {}

  const getFirstChannelName = () => {
    if (!channels || channels.length === 0) return '-'

    const firstChannel = channels[0]

    const { sendMode, externalEmail, receiverName } = firstChannel ?? {}

    let firstChannelName = '-'
    if (sendMode === SendMode.EXTERNAL && externalEmail) {
      firstChannelName = externalEmail
    } else if (
      activeTab === SecureMessagesTab.INBOX ||
      activeTab === SecureMessagesTab.ARCHIVED
    ) {
      firstChannelName = getFullName(
        senderName?.firstName,
        senderName?.lastName,
        externalEmail,
      )
    } else if (
      activeTab === SecureMessagesTab.SENT ||
      activeTab === SecureMessagesTab.DRAFT
    ) {
      firstChannelName = getFullName(
        receiverName?.firstName,
        receiverName?.lastName,
        externalEmail,
      )
    }

    return firstChannelName
  }

  const fullName = getFirstChannelName()

  return (
    <TextCell className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-[400]">
      {fullName}
    </TextCell>
  )
}

export { MessageUserNameCell }
