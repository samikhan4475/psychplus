'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { SERVICE_UNITS_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const ServiceUnitsTable = () => {
  const { id } = useParams<{ id: string; type: string }>()
  const { search, data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({ serviceId: id }, 1, true)
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className="bg-white rounded my-1 p-1">
      <ScrollArea className="rounded p-1">
        <DataTable
          data={data?.units ?? []}
          initialPageSize={SERVICE_UNITS_TABLE_PAGE_SIZE}
          columns={columns(sort, sortData)}
        />
      </ScrollArea>
    </Box>
  )
}

export { ServiceUnitsTable }
