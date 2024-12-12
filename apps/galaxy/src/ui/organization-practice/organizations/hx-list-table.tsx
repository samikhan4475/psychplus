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

interface HxListTableProps {
  organizationId: string
}

interface HxStatus {
  date: string
  status: string
  user: string
}

const columns: ColumnDef<HxStatus>[] = [
  {
    id: 'user',
    header: ({ column }) => <ColumnHeader label="User" />,
    cell: ({ row }) => <TextCell>{row.original.user}</TextCell>,
  },
  {
    id: 'date',
    header: ({ column }) => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => <TextCell>{row.original.date}</TextCell>,
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
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
