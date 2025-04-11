'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { NotificationList } from './notification-list'

const NotificationView = () => {
  return (
    <Flex direction="column" className="gap-y-6">
      <Text size="6" weight="bold">
        Notifications
      </Text>
      <Flex direction="column" className="shadow-3">
        {/* Will be used later on  */}
        {/* <NotificationTabs /> */}
        <NotificationList />
      </Flex>
    </Flex>
  )
}

export { NotificationView }
