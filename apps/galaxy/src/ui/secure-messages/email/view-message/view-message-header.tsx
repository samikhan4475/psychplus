import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { Text } from 'react-aria-components'
import toast from 'react-hot-toast'
import { ArchiveIcon, MailIcon } from '@/components/icons'
import { useStore as globalStore } from '@/store'
import { cn } from '@/utils'
import { updateChannelAction } from '../../actions'
import { PAGE_SIZE } from '../../contants'
import { useStore } from '../../store'
import { ActiveComponent, RecordStatus, SecureMessagesTab } from '../../types'

const ViewMessageHeader = () => {
  const user = globalStore((state) => state.user)
  const {
    secureMessages = [],
    page,
    total,
    previewSecureMessage,
    setPreviewSecureMessage,
    next,
    prev,
    setActiveComponent,
    activeTab,
  } = useStore((state) => state)

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
    const channel = previewSecureMessage?.secureMessage?.channels?.find(
      (channel) => channel.receiverUserId === user.id,
    )
    if (channel?.id && previewSecureMessage?.secureMessage?.id) {
      const payload = {
        ...channel,
      }

      if (type === 'messageStatus') {
        payload.isRead = !payload.isRead
      } else if (type === 'recordStatus') {
        payload.recordStatus = RecordStatus.ARCHIVED
      }

      const result = await updateChannelAction(
        previewSecureMessage.secureMessage.id,
        channel.id,
        payload,
      )

      if (result.state === 'error') {
        toast.error(result.error || 'Failed to update channel')
      }
    }
  }

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
        {activeTab === SecureMessagesTab.INBOX && (
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
        )}
        {activeTab !== SecureMessagesTab.SENT &&
          activeTab !== SecureMessagesTab.DRAFT && (
            <Button
              className="hover:bg-pp-table-subRows h-[16px] rounded-2 bg-transparent p-[2px] [box-shadow:none]"
              type="button"
              onClick={(e) => {
                e?.stopPropagation()
                onSubmit('messageStatus')
              }}
            >
              <MailIcon
                onClick={() => onSubmit('messageStatus')}
                width={16}
                height={16}
                className="fill-pp-icon-sub"
              />
            </Button>
          )}
      </Flex>
      <Flex align="center" gap="4" className="pr-6">
        <Text>
          {currentActiveMessage} of {total}
        </Text>
        <Flex>
          <ChevronLeftIcon
            onClick={previousMessageHandler}
            className="cursor-pointer"
          />
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
