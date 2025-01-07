'use client'

import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { RoundingViewFilterCard } from './rounding-view-filter-card'
import { RoundingViewPagination } from './rounding-view-pagination'
import { RoundingViewTable } from './rounding-view-table'
import { useStore } from './store'

const RoundingView = () => {
  const { loading } = useStore((state) => ({
    loading: state.loading,
  }))

  return (
    <Flex direction="column" className="h-full !overflow-hidden">
      <RoundingViewFilterCard />
      {loading ? <LoadingPlaceholder /> : <RoundingViewTable />}
      <RoundingViewPagination />
    </Flex>
  )
}

export { RoundingView }
