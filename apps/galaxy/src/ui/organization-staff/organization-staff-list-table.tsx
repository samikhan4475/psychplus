'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { FEATURE_TYPES } from './constants'
import { useStore } from './store'

const OrganizationStaffListTable = () => {
  const { id, type } = useParams<{ id: string; type: string }>()
  const { search, data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({
      organizationsIds: type === FEATURE_TYPES.ORGANIZATION ? [id] : [],
      practicesIds: type === FEATURE_TYPES.PRACTICE ? [id] : [],
    })
  }, [])

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
        data={data?.staff ?? []}
        columns={columns(sort, sortData, type === FEATURE_TYPES.ORGANIZATION)}
        disablePagination
        sticky
        isRowSpan
        tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
      />
    </ScrollArea>
  )
}

export { OrganizationStaffListTable }
