'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '../../store'
import { useStore } from '../store'
import { columns } from './table-columns'

const PayerPlanListTable = () => {
  const { loading, sort, sortData, search, data, payload, page } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      sort: state.sort,
      sortData: state.sortData,
      search: state.search,
      payload: state.payload,
      page: state.page,
    }),
  )
  const { activeTab } = useRootStore((state) => ({
    activeTab: state.activeTab,
  }))

  useEffect(() => {
    search(payload, page)
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
        data={data?.payerplanslist ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PayerPlanListTable }
