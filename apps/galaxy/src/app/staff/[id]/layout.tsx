import React, { Suspense } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { StaffNavigation } from '@/ui/staff-navigation'

interface StaffLayoutProps extends React.PropsWithChildren {
  params: {
    id: string
  }
}
const StaffLayout = ({ children, params }: StaffLayoutProps) => {
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
        <StaffNavigation staffId={params.id} />
        <ScrollArea className="flex-1">
          <Flex className="flex-1" mb="4">
            {children}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  )
}

export default StaffLayout
