'use client'

import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Practice } from '@/ui/organization-practice/types'
import { formatDateTime } from '@/utils'

const columns: ColumnDef<Practice>[] = [
  {
    id: 'user',
    header: () => <ColumnHeader label="User" />,
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'date',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.metadata?.createdOn &&
          formatDateTime(row.original.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
]

interface HistoryDataTableProps {
  data: Practice[]
  loading?: boolean
}

const HistoryDataTable = ({ data, loading }: HistoryDataTableProps) => {
  if (loading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return <DataTable columns={columns} data={data} />
}
export { HistoryDataTable }
