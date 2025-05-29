'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '@/store'
import { columns } from './columns'
import { useStore } from './store'
import { PreferredPartnerItem } from './types'

const PreferredPartnerListTable = () => {
  const { showFilters, loading, sort, sortData, data, search } = useStore(
    (state) => ({
      loading: state.loading,
      sort: state.sort,
      sortData: state.sortData,
      showFilters: state.showFilters,
      data: state.data,
      search: state.search,
    }),
  )
  const addTab = useRootStore((state) => state.addTab)
  const router = useRouter()
  useEffect(() => {
    search({}, 1, true)
  }, [])

  const handleRowClick = (row: Row<PreferredPartnerItem>) => {
    const href = `/preferred-partner/${row.original.id}/profile`
    addTab({
      href,
      label: `${row.original?.name}`,
    })
    router.push(href)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <ScrollArea
      className="bg-white max-w-[calc(100vw-188px)]"
      scrollbars="both"
    >
      <DataTable
        data={data?.preferredPartners ?? []}
        onRowClick={handleRowClick}
        tdClass="[&:has(.dialog-trigger-cell)]:!p-0"
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        theadClass="z-[1]"
        initialPageSize={!showFilters ? 20 : 30}
        columns={columns(sort, sortData)}
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { PreferredPartnerListTable }
