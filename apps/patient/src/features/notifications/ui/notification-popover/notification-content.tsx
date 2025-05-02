import React from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components-v2'
import { useToast } from '@/providers'
import { markAsReadNotificationAction } from '../../actions'
import { NotificationItem } from '../../types'
import { NotificationCard } from '../notification-card/notification-card'

interface NotificationContentProps {
  notificationList: NotificationItem[]
  isLoading: boolean
  onInboxCount: (count: number) => void
  inboxCount: number
  onOpen: () => void
}

const NotificationContent = ({
  notificationList,
  onInboxCount,
  onOpen,
  inboxCount,
  isLoading,
}: NotificationContentProps) => {
  const { toast } = useToast()

  const onMark = async (notificationId: string) => {
    const result = await markAsReadNotificationAction(notificationId)

    if (result.state === 'error') {
      toast({
        title: result.error ?? 'Failed to mark as read',
        type: 'error',
      })
    } else {
      onInboxCount(inboxCount - 1)
    }
  }

  if (isLoading)
    return (
      <LoadingPlaceholder containerClassName="min-w-[350px] mx-auto my-auto min-h-[350px]" />
    )

  return notificationList.length > 0 ? (
    <ScrollArea className="max-h-[calc(100vh-66px)] min-h-[350px] sm:max-h-[calc(100vh-325px)]">
      {notificationList.map((note) => (
        <NotificationCard
          popoverToggle={onOpen}
          onMark={onMark}
          key={note.id}
          {...note}
        />
      ))}
    </ScrollArea>
  ) : (
    <Flex className="min-h-[350px]" align="center" justify="center">
      <Text size="2" weight="bold" color="gray">
        No notifications to show
      </Text>
    </Flex>
  )
}

export { NotificationContent }
