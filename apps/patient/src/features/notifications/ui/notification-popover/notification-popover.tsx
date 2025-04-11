'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BellIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Popover } from '@radix-ui/themes'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { useToast } from '@/providers'
import { WebSocketEventType } from '@/types'
import { getNotificationsAction } from '../../actions'
import { NotificationItem } from '../../types'
import { BellIconButton } from './bell-icon-button'
import { NotificationContent } from './notification-content'
import { NotificationPopoverHeader } from './notification-popover-header'

const NotificationPopover = () => {
  const { toast } = useToast()
  const [inboxCount, setInboxCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(
    [],
  )

  const onOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleInboxCount = (message: { lv?: number }) => {
      setInboxCount(message.lv ?? 0)
    }

    webSocketEventBus.on(WebSocketEventType.InboxCount, handleInboxCount)
    ;(async () => {
      const response = await getNotificationsAction()
      if (response.state === 'success') {
        setNotificationList(response.data.notificationList)
      } else if (response.state === 'error') {
        toast({
          title: response.error ?? 'Failed to fetch NotificationList',
          type: 'error',
        })
      }
    })()

    return () => {
      webSocketEventBus.off(WebSocketEventType.InboxCount, handleInboxCount)
    }
  }, [])

  const onMarkAll = () => {
    // API Implementation will be done here
  }

  return (
    <>
      <Box className="hidden sm:block">
        <Popover.Root>
          <Popover.Trigger>
            <Button
              variant="outline"
              className="relative rounded-2 px-2 py-1"
              color="gray"
            >
              <Box>
                <BellIcon width={24} height={24} color="#1C2024" />
                {inboxCount > 0 && (
                  <Box className="min-w-2 min-h-2 rounded-full absolute right-[10px] top-2 bg-red-11" />
                )}
              </Box>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="max-w-[94vw] translate-y-2 overflow-hidden p-0 shadow-3">
            <NotificationPopoverHeader onMarkAll={onMarkAll} />
            <NotificationContent notificationList={notificationList} />
            <Flex className="items-center justify-center border-t border-gray-4 px-2 py-3">
              <Link
                href="/notifications"
                className="text-pp-blue-3 cursor-pointer text-2 font-bold hover:underline"
              >
                View all notifications
              </Link>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </Box>

      <Box className="block sm:hidden">
        <BellIconButton inboxCount={inboxCount} onClick={onOpen} />
        {isOpen && (
          <Box className="bg-white fixed left-0 top-0 z-50 h-screen w-screen">
            <NotificationPopoverHeader onClose={onOpen} onMarkAll={onMarkAll} />
            <NotificationContent notificationList={notificationList} />
          </Box>
        )}
      </Box>
    </>
  )
}

export { NotificationPopover }
