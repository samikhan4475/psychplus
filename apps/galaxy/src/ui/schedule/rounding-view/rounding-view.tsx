'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { RoundingViewFilterCard } from './rounding-view-filter-card'
import { RoundingViewTable } from './rounding-view-table'

const RoundingView = () => {
  return (
    <Flex direction="column" className="h-full overflow-auto">
      <ScrollArea className="flex-1">
        <Flex direction="column" className="flex-1">
          <RoundingViewFilterCard />
          <RoundingViewTable />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { RoundingView }
