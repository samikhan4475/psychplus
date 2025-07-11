'use client'

import { Flex } from '@radix-ui/themes'
import { ViewContainer } from '@/components-v2'

const WaitlistLayout = ({ children }: { children: React.ReactNode }) => (
  <ViewContainer className="max-w-[1400px] xs:px-5">
    <Flex gap="5">
      <Flex direction="column" className="flex-1">
        {children}
      </Flex>
    </Flex>
  </ViewContainer>
)

export default WaitlistLayout
