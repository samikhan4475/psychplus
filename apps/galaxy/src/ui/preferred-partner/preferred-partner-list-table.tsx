'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const PreferredPartnerListTable = () => {
  const { showFilters, loading, sort, sortData } = useStore((state) => ({
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
    showFilters: state.showFilters,
  }))

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
        data={[]}
        onRowClick={(row) => {
          //will be implemented later on
        }}
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
