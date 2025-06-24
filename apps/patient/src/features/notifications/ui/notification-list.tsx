'use client'

import { LoadingPlaceholder } from '@/components-v2'
import { useToast } from '@/providers'
import { Box, Button, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { useEffect, useRef, useState } from 'react'
import {
  getNotificationsAction,
  markAsReadNotificationAction,
} from '../actions'
import { NotificationResponse } from '../types'
import { NotificationCard } from './notification-card/notification-card'
import { createScrollRestorer } from './utils'

const NotificationList = () => {
  const { toast } = useToast()
  const [notificationListResponse, setNotificationListResponse] =
    useState<NotificationResponse>({
      notificationList: [],
      total: 0,
    })
  const { notificationList, total } = notificationListResponse
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)

  const handleMarkAsRead = async (notificationId: string) => {
    const result = await markAsReadNotificationAction(notificationId)

    if (result.state === 'error') {
      toast({
        title: result.error ?? 'Failed to mark as read',
        type: 'error',
      })
    }
  }

  const handleShowMore = () => setPage((prev) => prev + 1)

  useEffect(() => {
    ; (async () => {
      const container = scrollRef.current
      const restoreScroll = createScrollRestorer(container)

      setIsLoading(true)

      const response = await getNotificationsAction(page)

      if (response.state === 'error') {
        toast({
          title: response.error ?? 'Failed to fetch notifications',
          type: 'error',
        })
        return
      }

      const { notificationList } = response.data
      setNotificationListResponse((prev) => ({
        total: response.data.total,
        notificationList: [...prev.notificationList, ...notificationList],
      }))
      restoreScroll()

      setIsLoading(false)
    })()
  }, [page])

  if (isLoading && notificationList.length === 0) {
    return (
      <LoadingPlaceholder containerClassName="min-w-[350px] mx-auto my-auto min-h-[70vh]" />
    )
  }

  let buttonContent = 'Show More'

  if (isLoading) {
    buttonContent = 'Loading...'
  } else if (notificationList.length >= total) {
    buttonContent = 'No more notifications to show'
  }

  return notificationListResponse.notificationList.length > 0 ? (
    <>
      <ScrollArea className="max-h-[calc(100vh-290px)] hidden md:block">
        <Box ref={scrollRef}>
          {notificationList.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              onMark={handleMarkAsRead}
            />
          ))}
        </Box>
      </ScrollArea>
      <Box ref={scrollRef} className="block md:hidden">
        {notificationList.map((notification) => (
          <NotificationCard
            key={notification.id}
            {...notification}
            onMark={handleMarkAsRead}
          />
        ))}
      </Box>
      <Box className="px-2 py-3">
        <Button
          onClick={handleShowMore}
          radius="full"
          className="w-full"
          variant="outline"
          disabled={isLoading || notificationList.length >= total}
          color="gray"
          size="2"
        >
          {buttonContent}
        </Button>
      </Box>
    </>
  ) : (
    <Flex className="min-h-[70vh]" align="center" justify="center">
      <Text size="2" weight="bold" color="gray">
        No notifications to show
      </Text>
    </Flex>
  )
}

export { NotificationList }
