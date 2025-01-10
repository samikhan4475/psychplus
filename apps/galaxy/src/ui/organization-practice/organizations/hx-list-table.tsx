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
import { getAllOrganizationHxStatusListAction } from '../actions'
import { Organization } from '../types'

interface HxListTableProps {
  organizationId: string
}

interface HxStatus {
  date: string
  status: string
  user: string
}

const columns: ColumnDef<Organization>[] = [
  {
    id: 'user',
    header: ({ column }) => <ColumnHeader label="User" />,
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'date',
    header: ({ column }) => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.metadata?.createdOn &&
          formatDateTime(row.original.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
]

const HxListTable = ({ organizationId }: HxListTableProps) => {
  const [data, setData] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [organizationId])

  const init = async () => {
    setLoading(true)
    const response = await getAllOrganizationHxStatusListAction(organizationId)
    if (response.state === 'success') {
      setData(response.data)
    }
    setLoading(false)
  }

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
