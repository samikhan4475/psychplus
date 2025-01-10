'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '../store'
import { columns } from './columns'
import { useStore } from './store'

const OrganizationsListTable = () => {
  const { activeTab } = useRootStore((state) => state)
  const { search, data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({
      includePractices: true,
    })
  }, [activeTab])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.organizations ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
        isRowSpan
        tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { OrganizationsListTable }
