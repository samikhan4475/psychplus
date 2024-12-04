import React from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { ManagementNavigation } from '@/ui/management-navigation'

const ManagementLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex height="100%" direction="column" gap="1" className="bg-pp-bg-accent">
      <Flex gap="3" px="2" className="flex-1 overflow-auto">
        <ManagementNavigation />
        <ScrollArea className="flex-1">
          <Flex className="flex-1 h-full" mb="4">
            {children}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  )
}

export default ManagementLayout
