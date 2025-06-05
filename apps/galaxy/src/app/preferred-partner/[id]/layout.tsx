import React, { PropsWithChildren } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { PreferredPartnerNavigation } from '@/ui/preferred-partner-navigation'

const PreferredPartnerLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      gap="3"
      height="100%"
      width="100%"
      p="2"
      className="bg-pp-bg-accent flex-1"
    >
      <PreferredPartnerNavigation />
      <ScrollArea className="flex-1" type="auto" scrollbars="vertical">
        <Flex className="h-full flex-1 min-w-0 overflow-x-hidden">{children}</Flex>
      </ScrollArea>
    </Flex>
  )
}

export default PreferredPartnerLayout
