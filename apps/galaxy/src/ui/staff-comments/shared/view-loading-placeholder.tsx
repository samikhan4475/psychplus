'use client'

import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'

const ViewLoadingPlaceholder = () => {
  return (
    <Flex direction="column" className="min-h-[33dvh] flex-1 gap-1">
      <LoadingPlaceholder className="bg-white rounded-1 border border-gray-5" />
    </Flex>
  )
}

export { ViewLoadingPlaceholder }
