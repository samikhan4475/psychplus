'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { FilterForm } from './filter-form'
import { useStore } from './store'
import { getSchedulingColumns as column } from './table-columns'

const SchedulingHistoryTable = () => {
  const { id } = useParams<{ id: string }>()
  const {
    data,
    fetchSchedulingHistory,
    loading,
    isTCMVisitType,
    sort,
    setPatientId,
    sortData,
  } = useStore()

  useEffect(() => {
    setPatientId(id)
    fetchSchedulingHistory(id)
  }, [id])

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
              columns={column(isTCMVisitType, sort, sortData)}
              data={data?.list ?? []}
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
