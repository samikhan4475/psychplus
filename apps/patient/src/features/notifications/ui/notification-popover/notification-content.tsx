import React from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { NotificationItem } from '../../types'
import { NotificationCard } from '../notification-card/notification-card'

interface NotificationContentProps {
  notificationList: NotificationItem[]
}

const NotificationContent = ({
  notificationList,
}: NotificationContentProps) => {
  return (
    <>
      {/* Will be used later on */}
      {/* <NotificationTabs /> */}
      <ScrollArea className="sm:max-h-[calc(100vh-325px)] max-h-[calc(100vh-66px)]">
        {notificationList.map((note) => (
          <NotificationCard key={note.id} {...note} />
        ))}
      </ScrollArea>
    </>
  )
}

export { NotificationContent }
