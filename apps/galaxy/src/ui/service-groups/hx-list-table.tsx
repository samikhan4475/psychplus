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
import { formatDateTime } from '@/utils'
import { getAllServiceGroupHistoryAction } from './actions'
import { ServiceGroup } from './types'

interface HxListTableProps {
  groupId: string
  locationId: string
}

const columns: ColumnDef<ServiceGroup>[] = [
  {
    id: 'date',
    accessorKey: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.metadata?.updatedOn
          ? formatDateTime(row.original.metadata?.updatedOn)
          : row.original.metadata?.createdOn &&
            formatDateTime(row.original.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'user',
    accessorKey: 'metadata.updatedByFullName',
    header: ({ column }) => (
      <ColumnHeader label="User" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original?.metadata?.updatedByFullName
          ? row.original?.metadata?.updatedByFullName
          : row.original?.metadata?.createdByFullName}
      </TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'resourceStatus',
    header: ({ column }) => (
      <ColumnHeader label="Status" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.resourceStatus}</TextCell>,
  },
]
const HxListTable = ({ groupId, locationId }: HxListTableProps) => {
  const [data, setData] = useState<ServiceGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [groupId])

  const init = async () => {
    setLoading(true)
    const response = await getAllServiceGroupHistoryAction(locationId, groupId)
    if (response.state === 'success') {
      setData(response.data)
    }
    setLoading(false)
  }

  if (loading)
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )

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
