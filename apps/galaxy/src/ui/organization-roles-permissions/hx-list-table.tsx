'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Role } from '@/types'
import { formatDateTime } from '@/utils'
import { getAllRolesHistoryListAction } from './actions'

interface HxListTableProps {
  organizationId: string
}

const columns: ColumnDef<Role>[] = [
  {
    id: 'metadata.updatedByFullName',
    accessorKey: 'metadata.updatedByFullName',
    header: ({ column }) => (
      <ColumnHeader label="User" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata.updatedByFullName}</TextCell>
    ),
  },
  {
    id: 'shortName',
    accessorKey: 'shortName',
    header: ({ column }) => (
      <ColumnHeader label="Role" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.shortName}</TextCell>,
  },
  {
    id: 'actorCategory',
    accessorKey: 'actorCategory',
    header: ({ column }) => (
      <ColumnHeader
        label="Staff Type"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.actorCategory}</TextCell>,
  },
  {
    id: 'displayName',
    accessorKey: 'displayName',
    header: ({ column }) => (
      <ColumnHeader
        label="Display Name"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
  },
  {
    id: 'status',
    accessorKey: 'recordStatus',
    header: ({ column }) => (
      <ColumnHeader label="Status" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
  {
    id: 'metadata.createdOn',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader
        label="Created On"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row.original.metadata.createdOn)}</TextCell>
    ),
  },
  {
    id: 'metadata.createdBy',
    accessorKey: 'metadata.createdBy',
    header: ({ column }) => (
      <ColumnHeader
        label="Created By"
        sortable
        clientSideSort
        column={column}
      />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata.createdByFullName}</TextCell>
    ),
  },
]

const HxListTable = ({ organizationId }: HxListTableProps) => {
  const [data, setData] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getAllRolesHistoryListAction(organizationId)
      if (response.state === 'success') {
        setData(response.data)
      }
      setLoading(false)
    })()
  }, [organizationId])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea className="h-full p-2">
      <DataTable
        data={data ?? []}
        columns={columns}
        disablePagination
        sticky
        isRowSpan
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { HxListTable }
