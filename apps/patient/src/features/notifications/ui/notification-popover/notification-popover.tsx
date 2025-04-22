'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BellIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Popover } from '@radix-ui/themes'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { useToast } from '@/providers'
import { WebSocketEventType } from '@/types'
import {
  getNotificationsAction,
  markAsReadBatchNotificationAction,
} from '../../actions'
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
  const [isLoading, setIsLoading] = useState(true)

  const onOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen) getNotifications()
  }

  const getNotifications = async () => {
    setIsLoading(true)
    const response = await getNotificationsAction()
    if (response.state === 'error') {
      toast({
        title: response.error ?? 'Failed to fetch NotificationList',
        type: 'error',
      })
    } else {
      const { notificationList: notificationsResponse } = response.data
      const notificationsUnread = notificationsResponse.reduce(
        (count, notification) => (!notification.readOn ? count + 1 : count),
        0,
      )
      setInboxCount(notificationsUnread)
      setNotificationList(notificationsResponse)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const handleInboxCount = (message: { lv?: number }) =>
      setInboxCount(message?.lv ?? 0)

    webSocketEventBus.on(WebSocketEventType.InboxCount, handleInboxCount)

    getNotifications()

    return () => {
      webSocketEventBus.off(WebSocketEventType.InboxCount, handleInboxCount)
    }
  }, [])

  const onMarkAll = async () => {
    setIsLoading(true)
    const notificationsUnread = notificationList.filter(
      (notification) => !notification.readOn,
    )
    if (notificationsUnread.length === 0) return

    const unReadNotificationIds = notificationsUnread.map(
      (notification) => notification.id,
    )

    const result = await markAsReadBatchNotificationAction({
      notificationIds: unReadNotificationIds,
    })
    if (result.state === 'error') {
      toast({
        title: 'Failed to mark these notifications as read',
        type: 'error',
      })
    } else {
      getNotifications()
    }
    setIsLoading(false)
  }
  const onInboxCount = (count: number) => setInboxCount(count)
  return (
    <>
      <Box className="hidden sm:block">
        <Popover.Root onOpenChange={onOpen}>
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
          <Popover.Content className="min-w-[380px] max-w-[55vw] translate-y-2 overflow-hidden p-0 shadow-3">
            <>
              <NotificationPopoverHeader
                inboxCount={inboxCount}
                onMarkAll={onMarkAll}
                isLoading={isLoading}
              />
              <NotificationContent
                isLoading={isLoading}
                onInboxCount={onInboxCount}
                inboxCount={inboxCount}
                notificationList={notificationList}
              />
              <Flex className="items-center justify-center border-t border-gray-4 px-2 py-3">
                <Link
                  href="/notifications"
                  className="text-pp-blue-3 cursor-pointer text-2 font-bold hover:underline"
                >
                  View all notifications
                </Link>
              </Flex>
            </>
          </Popover.Content>
        </Popover.Root>
      </Box>

      <Box className="block sm:hidden">
        <BellIconButton inboxCount={inboxCount} onClick={onOpen} />
        {isOpen && (
          <Box className="bg-white fixed left-0 top-0 z-50 h-screen w-screen">
            <>
              <NotificationPopoverHeader
                isLoading={isLoading}
                inboxCount={inboxCount}
                onClose={onOpen}
                onMarkAll={onMarkAll}
              />
              <NotificationContent
                isLoading={isLoading}
                onInboxCount={onInboxCount}
                inboxCount={inboxCount}
                notificationList={notificationList}
              />
            </>
          </Box>
        )}
      </Box>
    </>
  )
}

export { NotificationPopover }
