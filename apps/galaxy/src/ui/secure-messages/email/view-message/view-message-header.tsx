import React, { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { Text } from 'react-aria-components'
import toast from 'react-hot-toast'
import { ArchiveIcon, MailIcon } from '@/components/icons'
import { updateChannelAction } from '../../actions'
import { useStore } from '../../store'
import {
  ActiveComponent,
  SecureMessagesTab,
  SecureMessageStatus,
} from '../../types'

const ViewMessageHeader = () => {
  const {
    secureMessages = [],
    previewSecureMessage,
    setPreviewSecureMessage,
    setActiveComponent,
    activeTab,
  } = useStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (previewSecureMessage?.secureMessage?.id) {
      const findIndex =
        secureMessages.findIndex(
          (item) => item.id === previewSecureMessage?.secureMessage?.id,
        ) + 1
      setCurrentPage(findIndex)
    }
  }, [secureMessages, previewSecureMessage])

  const nextMessageHandler = () => {
    if (currentPage < secureMessages.length) {
      const nextMessage = secureMessages[currentPage]
      if (nextMessage) {
        setPreviewSecureMessage({
          secureMessage: nextMessage,
          activeTab: previewSecureMessage.activeTab,
        })
        setCurrentPage(currentPage + 1)
      }
    }
  }

  const previousMessageHandler = () => {
    if (currentPage > 1) {
      const prevMessage = secureMessages[currentPage - 2]
      if (prevMessage) {
        setPreviewSecureMessage({
          secureMessage: prevMessage,
          activeTab: previewSecureMessage.activeTab,
        })
        setCurrentPage(currentPage - 1)
      }
    }
  }
  const onSubmit = async (type: string) => {
    const channel = previewSecureMessage?.secureMessage?.channels?.[0]
    if (channel && channel.id && previewSecureMessage?.secureMessage?.id) {
      const payload = {
        ...channel,
      }

      if (type === 'messageStatus') {
        payload.isRead = true
      } else if (type === 'recordStatus') {
        payload.recordStatus = SecureMessageStatus.ARCHIVED
      }

      const result = await updateChannelAction(
        previewSecureMessage.secureMessage.id,
        channel.id,
        payload,
      )

      if (result.state === 'error') {
        toast.error('Failed to update channel')
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
          onClick={() => setActiveComponent(ActiveComponent.NEW_EMAIL)}
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
          {currentPage} of {secureMessages.length}
        </Text>
        <Flex>
          <ChevronLeftIcon
            onClick={previousMessageHandler}
            className="cursor-pointer"
          />
          <ChevronRightIcon
            onClick={nextMessageHandler}
            className="cursor-pointer"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ViewMessageHeader }
