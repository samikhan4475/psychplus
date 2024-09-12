'use client'

import { useEffect } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { FilterForm } from './filter-form'
import { useStore } from './store'
import { columns } from './table-columns'

const SchedulingHistoryTable = () => {
  const { data, fetchSchedulingHistory, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchSchedulingHistory: state.fetchSchedulingHistory,
  }))

  useEffect(() => {
    fetchSchedulingHistory()
  }, [])

  return (
    <Flex direction="column" className="gap-1">
      <FilterForm />
      <ScrollArea className={ScrollAreaClassName} scrollbars="horizontal">
        {loading ? (
          <Flex height="100%" align="center" justify="center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <Box className="min-w-max">
            <DataTable
              columns={columns}
              data={data?.schedulingHistories ?? []}
              isRowSpan
            />
          </Box>
        )}
      </ScrollArea>
    </Flex>
  )
}
const ScrollAreaClassName =
  'bg-white max-w-[calc(100vw_-_190px)] overflow-x-auto p-2'

export { SchedulingHistoryTable }
