'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const OrganizationRolesListTable = () => {
  const { id } = useParams<{ id: string }>()
  const { search, data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({
      organizationId: id ?? '',
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
        data={data ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
        isRowSpan
        tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
      />
    </ScrollArea>
  )
}

export { OrganizationRolesListTable }
