'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ProviderCodingFilters } from './provider-coding-filters'
import { ProvierCodingTableView } from './provider-coding-table-view'
import { useStore } from './store'

const ProviderCoding = () => {
  const { fetchProviderCodingView, loading } = useStore((state) => ({
    fetchProviderCodingView: state.fetchProviderCodingView,
    loading: state.loading,
  }))
  useEffect(() => {
    fetchProviderCodingView()
  }, [])

  return (
    <Flex direction="column" className="h-full overflow-auto">
      <ScrollArea className="flex-1">
        <Flex direction="column" className="flex-1">
          <ProviderCodingFilters />
          {loading ? <LoadingPlaceholder /> : <ProvierCodingTableView />}
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { ProviderCoding }
