import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { TextCell } from '@/components'
import { useStore as globalStore } from '@/store'
import { cn } from '@/utils'
import { useStore as useMessagesStore } from '../../../messages/store'
import { updateChannelAction } from '../../actions'
import { useStore } from '../../store'
import {
  ActiveComponent,
  RecordStatus,
  SecureMessage,
  SecureMessagesTab,
} from '../../types'
import {
  getLatestMessageWithOwnChannel,
  hasUnreadInConversation,
} from '../../utils'
import { ArchiveButton } from '../archive-button'
import { MarkAsReadButton } from '../mark-as-read-button'
import { MarkAsUnreadButton } from '../mark-as-unread-button'

const MessageSubjectCell = ({ row }: { row: Row<SecureMessage> }) => {
  const {
    activeTab,
    formValues,
    previewSecureMessage,
    setPreviewSecureMessage,
    setActiveComponent,
    search,
    page,
  } = useStore((state) => ({
    activeTab: state.activeTab,
    formValues: state.formValues,
    previewSecureMessage: state.previewSecureMessage,
    setPreviewSecureMessage: state.setPreviewSecureMessage,
    setActiveComponent: state.setActiveComponent,
    search: state.search,
    page: state.page,
  }))
  const fetchUnreadCount = useMessagesStore((state) => state.fetchUnreadCount)
  const user = globalStore((state) => state.user)

  // to find the latest logged in user's own channel and message in the conversation
  const { channel: latestChannel } = useMemo(() => {
    return getLatestMessageWithOwnChannel(row.original, user.id)
  }, [row.original?.id])

  const hasUnread = useMemo(
    () => hasUnreadInConversation(row.original, user.id),
    [row.original, user.id],
  )

  const onSubmit = async (type: string) => {
    if (!latestChannel?.id || !row.original.id) return

    if (type === 'messageStatus' && latestChannel.isRead) {
      // If marking as unread, only update the latest message
      const payload = {
        ...latestChannel,
        isRead: false,
      }
      const result = await updateChannelAction(
        latestChannel.messageId,
        latestChannel.id,
        payload,
      )

      if (result.state === 'error') {
        toast.error(result.error || 'Failed to mark all as unread')
        return
      }
      toast.success('Message marked as unread successfully')
    } else if (
      (type === 'messageStatus' && !latestChannel.isRead) ||
      type === 'recordStatus'
    ) {
      const conversation = row.original?.secureMessageConversations || []
      if (!conversation?.length) return

      // Find all ownChannels and update them as Archived/Active using Promise.all
      const ownChannels = conversation.flatMap((message) =>
        (message?.channels || [])
          .filter((ch) => ch.receiverUserId === user.id)
          .map((ch) => ({ messageId: message.id, channel: ch })),
      )

      const responses = await Promise.all(
        ownChannels.map(async ({ channel }) => {
          const payload = {
            ...channel,
          }
          if (type === 'messageStatus') {
            payload.isRead = true
          } else if (type === 'recordStatus') {
            payload.recordStatus =
              channel.recordStatus === RecordStatus.ARCHIVED
                ? RecordStatus.ACTIVE
                : RecordStatus.ARCHIVED
          }
          return updateChannelAction(channel.messageId, channel.id, payload)
        }),
      )
      if (responses.some((response) => response.state === 'error')) {
        toast.error(
          type === 'messageStatus'
            ? 'Failed to mark all as read'
            : 'Failed to update channels',
        )
        return
      }
      toast.success('Message updated successfully')
    } else return

    if (type === 'recordStatus') {
      setPreviewSecureMessage({ activeTab, secureMessage: null })
      setActiveComponent(ActiveComponent.NEW_EMAIL_PLACEHOLDER)
    } else if (previewSecureMessage.secureMessage?.id === row.original.id) {
      setPreviewSecureMessage({
        activeTab,
        secureMessage: {
          ...row.original,
          secureMessageConversations:
            row.original.secureMessageConversations?.map((conv) => {
              return {
                ...conv,
                channels: conv.channels.map((ch) =>
                  ch.receiverUserId === user.id
                    ? { ...ch, isRead: !latestChannel.isRead }
                    : ch,
                ),
              }
            }) ?? [],
        },
      })
    }

    search({ messageStatus: activeTab, ...formValues }, page, true)
    fetchUnreadCount()
  }

  const isInboxOrArchived = [
    SecureMessagesTab.INBOX,
    SecureMessagesTab.ARCHIVED,
  ].includes(activeTab)

  return (
    <Flex justify="between" width="100%" className="relative  p-0">
      <TextCell className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-[400]">
        {row.original.subject || '-'}
      </TextCell>
      <Flex
        gap="2"
        justify="end"
        pr="2"
        className={cn(
          'bg-pp-bg-table-cell invisible absolute -top-0 right-0 p-0 px-2 group-hover/row-hover:visible',
          {
            'bg-pp-table-subRows': row.getIsSelected(),
          },
        )}
      >
        {isInboxOrArchived && latestChannel && (
          <ArchiveButton onSubmit={onSubmit} channel={latestChannel} />
        )}

        {isInboxOrArchived && !hasUnread && (
          <MarkAsUnreadButton onSubmit={onSubmit} />
        )}
        {isInboxOrArchived && hasUnread && (
          <MarkAsReadButton onSubmit={onSubmit} />
        )}
      </Flex>
    </Flex>
  )
}
export { MessageSubjectCell }
