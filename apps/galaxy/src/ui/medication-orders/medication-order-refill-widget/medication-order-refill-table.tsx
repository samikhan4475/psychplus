'use client'

import { useEffect, useMemo } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const MedicationOrderRefillTable = () => {
  const { searchMedicationsList, data, loading, sort, sortData } = useStore(
    (state) => ({
      searchMedicationsList: state.searchMedicationsList,
      loading: state.loading,
      data: state.data,
      sort: state.sort,
      sortData: state.sortData,
    }),
  )
  useEffect(() => {
    searchMedicationsList()
  }, [])
  const memoizedColumns = useMemo(() => columns(sort, sortData), [])
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
        data={data?.refillRequests ?? []}
        columns={memoizedColumns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { MedicationOrderRefillTable }
