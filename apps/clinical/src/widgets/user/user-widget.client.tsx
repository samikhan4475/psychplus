'use client'

import { useRef } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useUser } from '@psychplus/user'
import { USER_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { useStore } from './store'

const UserWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  const user = useUser(useStore)

  usePublishLoaded(USER_WIDGET)
  usePublishSize(USER_WIDGET, ref)
  useSubscribeClosePopover(USER_WIDGET)

  return (
    <Flex
      direction="column"
      p="3"
      width="100%"
      className="h-full min-w-fit"
      ref={ref}
    >
      <Text>
        This example widget will fetch and display the current user&apos;s name.
      </Text>
      <Text>
        <b>User:</b> {user.legalName.firstName}
      </Text>
    </Flex>
  )
}

export { UserWidgetClient }
