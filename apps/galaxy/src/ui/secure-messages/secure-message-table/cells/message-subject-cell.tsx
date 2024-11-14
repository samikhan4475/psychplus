import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { TextCell } from '@/components'
import { useStore as globalStore } from '@/store'
import { updateChannelAction } from '../../actions'
import { ArchiveButton } from '../../archive-button'
import { MarkAsReadButton } from '../../mark-as-read-button'
import { useStore } from '../../store'
import {
  SecureMessage,
  SecureMessagesTab,
  SecureMessageStatus,
} from '../../types'

const MessageSubjectCell = ({ row }: { row: Row<SecureMessage> }) => {
  const { activeTab, search, page } = useStore((state) => state)
  const user = globalStore((state) => state.user)

  const onSubmit = async (type: string) => {
    const channel = row.original.channels?.find(
      (channel) => channel.receiverUserId === user.id,
    )

    if (!channel?.id || !row.original.id) return
    const payload = {
      ...channel,
    }

    if (type === 'messageStatus') {
      payload.isRead = true
    } else if (type === 'recordStatus') {
      payload.recordStatus = SecureMessageStatus.ARCHIVED
    }

    const result = await updateChannelAction(
      row.original.id,
      channel.id,
      payload,
    )

    if (result.state === 'error') {
      return toast.error(result.error || 'Failed to update channel')
    }
    search({ messageStatus: activeTab }, page, true)
  }
  return (
    <Flex justify="between" width="100%" className="relative  p-0">
      <TextCell className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-[400]">
        {row.original.subject || '-'}
      </TextCell>
      <Flex
        gap="2"
        justify="end"
        pr="2"
        className="bg-pp-bg-table-cell invisible absolute -top-0 right-0 p-0 px-2 group-hover/row-hover:visible"
      >
        {activeTab === SecureMessagesTab.INBOX && (
          <ArchiveButton onSubmit={onSubmit} />
        )}
        {activeTab !== SecureMessagesTab.SENT &&
          activeTab !== SecureMessagesTab.DRAFT && (
            <MarkAsReadButton onSubmit={onSubmit} />
          )}
      </Flex>
    </Flex>
  )
}
export { MessageSubjectCell }
