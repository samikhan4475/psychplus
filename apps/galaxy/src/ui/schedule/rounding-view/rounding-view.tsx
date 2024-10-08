'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { RoundingViewFilterCard } from './rounding-view-filter-card'
import { RoundingViewTable } from './rounding-view-table'
import { useBookedAppointmentsStore } from '../store'

const RoundingView = () => {
  const loading = useBookedAppointmentsStore((state) => state.loading)

  return (
    <Flex direction="column" className="h-full overflow-auto">
      <ScrollArea className="flex-1">
        <Flex direction="column" className="flex-1">
          <RoundingViewFilterCard />
          {loading ? <LoadingPlaceholder /> : <RoundingViewTable />}
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { RoundingView }
