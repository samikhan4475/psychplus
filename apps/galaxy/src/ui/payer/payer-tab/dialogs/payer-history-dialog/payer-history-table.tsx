'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { PayerAuditHistoryPayload } from '@/ui/payer/types'
import { PayerHistoryFilterForm } from './payer-history-filter-form'
import { useStore } from './store'
import { columns } from './table-columns'

const PayerHistoryTable = () => {
  const { loading, sort, sortData, search, data, payload } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      sort: state.sort,
      sortData: state.sortData,
      search: state.search,
      payload: state.payload,
    }),
  )

  useEffect(() => {
    search(payload)
  }, [])

  const handleFilterSubmit = (filterPayload?: PayerAuditHistoryPayload) => {
    search(filterPayload)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      <PayerHistoryFilterForm onFilterSubmit={handleFilterSubmit} />
      <ScrollArea>
        <DataTable
          data={data ?? []}
          columns={columns(sort, sortData)}
          disablePagination
          sticky
          tableClass="h-[400px]"
        />
      </ScrollArea>
    </>
  )
}

export { PayerHistoryTable }
