'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { formatDateTime, getSortDir } from '@/utils'
import { ActionsCell, ServiceRoomHistoryDialog } from './cells'
import { SERVICE_ROOM_LIST_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'
import { ServiceRoom } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ServiceRoom>[] => {
  return [
    {
      id: 'room',
      header: ({ column }) => (
        <ColumnHeader
          label="Room Name/No."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.room}</TextCell>,
    },

    {
      id: 'createdOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Created on"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.metadata?.createdOn &&
            formatDateTime(row.original?.metadata?.createdOn)}
        </TextCell>
      ),
    },
    {
      id: 'createdBy',
      header: ({ column }) => (
        <ColumnHeader
          label="Created By"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.metadata?.createdByFullName}</TextCell>
      ),
    },
    {
      id: 'resourceStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Room Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ServiceRoomHistoryDialog,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <ColumnHeader
          label="Actions"
          className="min-w-[140px]"
          column={column}
        />
      ),
      cell: ActionsCell,
    },
  ]
}

const ServiceRoomListTable = () => {
  const { id } = useParams<{ id: string; type: string }>()
  const { search, data, loading, sort, sortData, page } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
    page: state.page,
  }))

  useEffect(() => {
    search({ serviceId: id }, page, true)
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
          data={data?.rooms ?? []}
          initialPageSize={SERVICE_ROOM_LIST_TABLE_PAGE_SIZE}
          columns={columns(sort, sortData)}
        />
      </ScrollArea>
    </Box>
  )
}

export { ServiceRoomListTable }
