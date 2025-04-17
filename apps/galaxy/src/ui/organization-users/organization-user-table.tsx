'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const OrganizationUserTable = () => {
  const { loading, data, search } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    search({
      organizationIds: [id],
    })
  }, [id])

  if (loading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className="bg-white mt-1 overflow-hidden p-2">
      <ScrollArea>
        <DataTable
          data={data ?? []}
          columns={columns}
          tableRowClass="relative"
          tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
          disablePagination
          isRowSpan
          sticky
        />
      </ScrollArea>
    </Box>
  )
}

export { OrganizationUserTable }
