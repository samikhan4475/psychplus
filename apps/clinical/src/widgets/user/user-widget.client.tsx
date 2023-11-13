'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useUser } from '@psychplus/user'
import { useStore } from './store'

const UserWidgetClient = () => {
  const user = useUser(useStore)

  return (
    <Flex direction="column" height="100%" width="100%">
      <Text>
        This example widget will fetch and display the current user&apos;s name.
      </Text>
      <Text>
        <b>User:</b> {user.fullName}
      </Text>
    </Flex>
  )
}

export { UserWidgetClient }
