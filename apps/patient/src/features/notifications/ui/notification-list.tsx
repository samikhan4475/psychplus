'use client'

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useToast } from '@/providers'
import { getNotificationsAction } from '../actions'
import { NotificationItem } from '../types'
import { NotificationCard } from './notification-card/notification-card'

const NotificationList = () => {
  const { toast } = useToast()
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(
    [],
  )

  useEffect(() => {
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
  }, [])

  return (
    <ScrollArea className="max-h-[calc(100vh-290px)]">
      {notificationList.map((note) => (
        <NotificationCard key={note.id} {...note} />
      ))}
    </ScrollArea>
  )
}

export { NotificationList }
