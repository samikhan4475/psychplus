'use client'

import React, { useEffect, useState } from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components-v2'
import { useToast } from '@/providers'
import { getNotificationsAction, markAsReadNotificationAction } from '../actions'

import { NotificationItem } from '../types'
import { NotificationCard } from './notification-card/notification-card'

const NotificationList = () => {
  const { toast } = useToast()
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(true)

  const onMark = async (notificationId: string) => {
    const result = await markAsReadNotificationAction(notificationId)

    if (result.state === 'error') {
      toast({
        title: result.error ?? 'Failed to mark as read',
        type: 'error',
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      const response = await getNotificationsAction(true)

      if (response.state === 'success') {
        setNotificationList(response.data.notificationList)
      } else if (response.state === 'error') {
        toast({
          title: response.error ?? 'Failed to fetch NotificationList',
          type: 'error',
        })
      }
      setIsLoading(false)
    })()
  }, [])

  if (isLoading)
    return (
      <LoadingPlaceholder containerClassName="min-w-[350px] mx-auto my-auto min-h-[70vh]" />
    )

  return notificationList.length > 0 ? (
    <ScrollArea className="max-h-[calc(100vh-290px)]">
      {notificationList.map((note) => (
        <NotificationCard onMark={onMark} key={note.id} {...note} />
      ))}
    </ScrollArea>
  ) : (
    <Flex className="min-h-[70vh]" align="center" justify="center">
      <Text size="2" weight="bold" color="gray">
        No notifications to show
      </Text>
    </Flex>
  )
}

export { NotificationList }
