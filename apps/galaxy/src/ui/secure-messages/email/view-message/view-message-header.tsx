import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Tooltip } from '@radix-ui/themes'
import { Text } from 'react-aria-components'
import toast from 'react-hot-toast'
import { ArchiveIcon } from '@/components/icons'
import { useStore as globalStore } from '@/store'
import { cn } from '@/utils'
import { useStore as useMessagesStore } from '../../../messages/store'
import { updateChannelAction } from '../../actions'
import { PAGE_SIZE } from '../../contants'
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
import { MarkAsReadButton } from './mark-as-read-button'
import { MarkAsUnreadButton } from './mark-as-unread-button'

const ViewMessageHeader = () => {
  const user = globalStore((state) => state.user)
  const fetchUnreadCount = useMessagesStore((state) => state.fetchUnreadCount)
  const {
    secureMessages = [],
    formValues,
    page,
    total,
    previewSecureMessage,
    setPreviewSecureMessage,
    setSecureMessages,
    search,
    next,
    prev,
    setActiveComponent,
    activeTab,
  } = useStore((state) => ({
    secureMessages: state.secureMessages,
    formValues: state.formValues,
    page: state.page,
    total: state.total,
    previewSecureMessage: state.previewSecureMessage,
    setPreviewSecureMessage: state.setPreviewSecureMessage,
    setSecureMessages: state.setSecureMessages,
    search: state.search,
    next: state.next,
    prev: state.prev,
    setActiveComponent: state.setActiveComponent,
    activeTab: state.activeTab,
  }))

  const [currentActiveMessage, setCurrentActiveMessage] = useState(1)

  useEffect(() => {
    if (previewSecureMessage?.secureMessage?.id) {
      const findIndex = secureMessages.findIndex(
        (item) => item.id === previewSecureMessage?.secureMessage?.id,
      )
      if (findIndex === -1) return
      setCurrentActiveMessage((page - 1) * PAGE_SIZE + findIndex + 1)
    }
  }, [secureMessages, previewSecureMessage.secureMessage?.id, page])

  // to find the latest logged in user's own channel and message in the conversation
  const { channel: latestChannel, message: latestMessage } = useMemo(() => {
    return getLatestMessageWithOwnChannel(
      previewSecureMessage?.secureMessage,
      user.id,
    )
  }, [previewSecureMessage?.secureMessage?.id])

  const hasUnread = useMemo(
    () =>
      previewSecureMessage?.secureMessage
        ? hasUnreadInConversation(
            previewSecureMessage.secureMessage as SecureMessage,
            user.id,
          )
        : false,
    [previewSecureMessage?.secureMessage, user.id],
  )

  const nextMessageHandler = async () => {
    const totalMessagesLoaded = (page - 1) * PAGE_SIZE + secureMessages.length
    if (currentActiveMessage < totalMessagesLoaded) {
      const nextMessageIndex = currentActiveMessage % PAGE_SIZE
      const nextMessage = secureMessages[nextMessageIndex]
      if (nextMessage) {
        setPreviewSecureMessage({
          secureMessage: nextMessage,
          activeTab: previewSecureMessage.activeTab,
        })
        setCurrentActiveMessage(currentActiveMessage + 1)
      }
    } else if (page * PAGE_SIZE < total) {
      const messages = await next()
      const nextMessage = messages?.[0]
      if (!nextMessage) return
      setPreviewSecureMessage({
        ...previewSecureMessage,
        secureMessage: nextMessage,
      })
      setCurrentActiveMessage(page * PAGE_SIZE + 1)
    }
  }

  const previousMessageHandler = async () => {
    if (currentActiveMessage % PAGE_SIZE === 1 && page > 1) {
      const prevMessages = prev()
      const prevMessage = prevMessages[PAGE_SIZE - 1]
      if (prevMessage) {
        setPreviewSecureMessage({
          ...previewSecureMessage,
          secureMessage: prevMessage,
        })
        return setCurrentActiveMessage((page - 1) * PAGE_SIZE)
      }
    } else if (currentActiveMessage > 1) {
      const prevMessageIndex = (currentActiveMessage - 2) % PAGE_SIZE
      const prevMessage = secureMessages[prevMessageIndex]
      if (prevMessage) {
        setPreviewSecureMessage({
          ...previewSecureMessage,
          secureMessage: prevMessage,
        })
        setCurrentActiveMessage(currentActiveMessage - 1)
      }
    }
  }

  const onSubmit = async (type: string) => {
    const conversation =
      previewSecureMessage?.secureMessage?.secureMessageConversations || []
    if (!conversation?.length) return

    if (type === 'messageStatus') {
      if (!latestChannel?.id) return
      const payload = {
        ...latestChannel,
        isRead: !latestChannel.isRead,
      }

      const result = await updateChannelAction(
        latestMessage.id,
        latestChannel.id,
        payload,
      )

      if (result.state === 'error') {
        toast.error(result.error || 'Failed to update channel')
        return
      }
      toast.success('Message updated successfully')
    } else if (type === 'recordStatus') {
      // Find all ownChannels and update them as Archived using Promise.all
      const ownChannels = conversation.flatMap((message) =>
        (message?.channels || [])
          .filter((ch) => ch.receiverUserId === user.id)
          .map((ch) => ({ messageId: message.id, channel: ch })),
      )

      const responses = await Promise.all(
        ownChannels.map(async ({ messageId, channel }) => {
          const payload = {
            ...channel,
            recordStatus:
              channel.recordStatus === RecordStatus.ARCHIVED
                ? RecordStatus.ACTIVE
                : RecordStatus.ARCHIVED,
          }
          return updateChannelAction(messageId, channel.id, payload)
        }),
      )
      if (responses.some((response) => response.state === 'error')) {
        toast.error('Failed to update channels')
        return
      }
      toast.success(
        `${
          activeTab === SecureMessagesTab.ARCHIVED ? 'Archived' : 'Unarchived'
        } successfully`,
      )
      setPreviewSecureMessage({ activeTab, secureMessage: null })
      setActiveComponent(ActiveComponent.NEW_EMAIL_PLACEHOLDER)
      search({ messageStatus: activeTab, ...formValues }, page, true)

      return
    } else return

    if (latestChannel?.id && previewSecureMessage?.secureMessage?.id) {
      // Update all channels in all conversations where receiverUserId matches user.id
      const updatedConversations =
        previewSecureMessage?.secureMessage?.secureMessageConversations?.map(
          (conv) => ({
            ...conv,
            channels: conv.channels?.map((ch) => {
              const payload = { ...ch }
              if (type === 'messageStatus') {
                payload.isRead = !payload.isRead
              } else if (type === 'recordStatus') {
                payload.recordStatus =
                  payload.recordStatus !== RecordStatus.ARCHIVED
                    ? RecordStatus.ARCHIVED
                    : RecordStatus.ACTIVE
              }
              return ch.receiverUserId === user.id ? { ...payload } : ch
            }),
          }),
        )
      setPreviewSecureMessage({
        ...previewSecureMessage,
        secureMessage: {
          ...previewSecureMessage.secureMessage,
          secureMessageConversations: updatedConversations,
        },
      })
      setSecureMessages(
        secureMessages.map((msg) =>
          msg.id === previewSecureMessage?.secureMessage?.id
            ? {
                ...msg,
                secureMessageConversations: updatedConversations,
              }
            : msg,
        ),
      )

      if (type === 'messageStatus') {
        fetchUnreadCount()
      }
    }
  }

  const isInboxOrArchived = [
    SecureMessagesTab.INBOX,
    SecureMessagesTab.ARCHIVED,
  ].includes(activeTab)

  return (
    <Flex
      className="bg-pp-table-subRows  h-8 w-full"
      justify="between"
      align="center"
    >
      <Flex align="center" gap="4" className="pl-6">
        <ArrowLeftIcon
          onClick={() => {
            setPreviewSecureMessage({
              ...previewSecureMessage,
              secureMessage: null,
            })
            setActiveComponent(ActiveComponent.NEW_EMAIL_PLACEHOLDER)
          }}
          className="text-pp-gray-1 cursor-pointer"
        />

        {(activeTab === SecureMessagesTab.INBOX ||
          activeTab === SecureMessagesTab.ARCHIVED) && (
          <Tooltip
            content={
              activeTab === SecureMessagesTab.INBOX ? 'Archive' : 'Unarchive'
            }
          >
            <Button
              type="button"
              variant="outline"
              className="hover:bg-pp-table-subRows h-[16px] rounded-2 bg-transparent p-[2px] [box-shadow:none]"
              onClick={(e) => {
                e?.stopPropagation()
                onSubmit('recordStatus')
              }}
            >
              <ArchiveIcon
                width={16}
                height={16}
                className="fill-pp-icon-sub cursor-pointer"
              />
            </Button>
          </Tooltip>
        )}
        {isInboxOrArchived && (
          <>
            {isInboxOrArchived && !hasUnread && (
              <MarkAsUnreadButton onSubmit={onSubmit} />
            )}
            {isInboxOrArchived && hasUnread && (
              <MarkAsReadButton onSubmit={onSubmit} />
            )}
          </>
        )}
      </Flex>
      <Flex align="center" gap="4" className="pr-6">
        <Flex align="center">
          <ChevronLeftIcon
            onClick={previousMessageHandler}
            className="cursor-pointer"
          />
          <Text>
            {currentActiveMessage} of {total}
          </Text>
          <ChevronRightIcon
            onClick={nextMessageHandler}
            className={cn(
              'cursor-pointer',
              currentActiveMessage === total && 'hidden',
            )}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ViewMessageHeader }
