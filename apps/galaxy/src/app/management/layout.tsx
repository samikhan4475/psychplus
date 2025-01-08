import React from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { ManagementNavigation } from '@/ui/management-navigation'

const ManagementLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex
      gap="3"
      height="100%"
      width="100%"
      p="2"
      className="bg-pp-bg-accent flex-1"
    >
      <ManagementNavigation />
      <ScrollArea className="flex-1">
        <Flex className="h-full flex-1">{children}</Flex>
      </ScrollArea>
    </Flex>
  )
}

export default ManagementLayout
