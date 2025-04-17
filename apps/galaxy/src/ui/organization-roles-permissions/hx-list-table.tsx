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

interface HxListTableProps {
  organizationId: string
}

const columns: ColumnDef<Role>[] = [
  {
    id: 'shortName',
    header: () => <ColumnHeader label="Role" sortable />,
    cell: ({ row }) => <TextCell>{row.original.shortName}</TextCell>,
  },
  {
    id: 'actorCategory',
    header: () => <ColumnHeader label="Staff Type" sortable />,
    cell: ({ row }) => <TextCell>{row.original.actorCategory}</TextCell>,
  },
  {
    id: 'displayName',
    header: () => <ColumnHeader label="Display Name" sortable />,
    cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="Status" sortable />,
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
  {
    id: 'metadata.createdOn',
    header: () => <ColumnHeader label="Created On" sortable />,
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row.original.metadata.createdOn)}</TextCell>
    ),
  },
  {
    id: 'metadata.createdBy',
    header: () => <ColumnHeader label="Created By" sortable />,
    cell: ({ row }) => (
      <TextCell>{row.original.metadata.createdByFullName}</TextCell>
    ),
  },
]

const HxListTable = ({ organizationId }: HxListTableProps) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    // TODO: need to call action here to fetch data
    setData([])
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
