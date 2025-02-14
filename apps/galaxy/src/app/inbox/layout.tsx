import React, { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'

const MessageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex height="100%" direction="column" gap="1" className="bg-pp-bg-accent">
      <Suspense
        fallback={
          <Flex className="bg-white h-[146px] border-b border-b-gray-5">
            <LoadingPlaceholder />
          </Flex>
        }
      ></Suspense>
      <Flex gap="3" px="2" className="flex-1 overflow-auto">
        {children}
      </Flex>
    </Flex>
  )
}

export default MessageLayout
