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
import { ActionsCell, ServiceGroupHistoryDialog } from './cells'
import { SERVICE_GROUPS_LIST_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'
import { ServiceGroup } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ServiceGroup>[] => {
  return [
    {
      id: 'group',
      header: ({ column }) => (
        <ColumnHeader
          label="Group Name/No."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.group}</TextCell>,
    },
    {
      id: 'coSignerName.firstName',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Cosigner"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.coSignerName &&
            row.original?.coSignerName?.firstName +
              ' ' +
              row.original?.coSignerName?.lastName}
        </TextCell>
      ),
    },
    {
      id: 'practiceId',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Practice"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practiceId}</TextCell>,
    },
    {
      id: 'metadata.createdOn',
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
      id: 'metadata.createdByFullName',
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
          label="Group Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ServiceGroupHistoryDialog,
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

const ServiceGroupsListTable = () => {
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
          data={data?.groups ?? []}
          initialPageSize={SERVICE_GROUPS_LIST_TABLE_PAGE_SIZE}
          columns={columns(sort, sortData)}
        />
      </ScrollArea>
    </Box>
  )
}

export { ServiceGroupsListTable }
