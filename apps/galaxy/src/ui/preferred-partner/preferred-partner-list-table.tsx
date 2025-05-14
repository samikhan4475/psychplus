'use client'

import { useRouter } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Staff } from '../staff-management/types'
import { columns } from './columns'
import { useStore } from './store'

const PreferredPartnerListTable = () => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)
  const { showFilters, loading, sort, sortData } = useStore((state) => ({
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
    showFilters: state.showFilters,
  }))

  const handleRowClick = (row: Row<Staff>) => {
    const href = `/preferred-partner/${row.original.ppId}/profile`
    addTab({
      href,
      label: `${row.original?.ppName}`,
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
        data={[]}
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
