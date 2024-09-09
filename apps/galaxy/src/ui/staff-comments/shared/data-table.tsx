'use client'

import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DateCell,
  DataTable as Table,
  TextCell,
} from '@/components'
import { StaffComment } from '../types'

interface DataTableProps {
  data: StaffComment[]
}

const columns: ColumnDef<StaffComment>[] = [
  {
    accessorKey: 'data_time',
    header: () => (
      <ColumnHeader label="Date/Time" className="!text-1 !font-medium" />
    ),
    cell: ({ row }) => <DateCell>{row?.original?.data_time}</DateCell>,
  },
  {
    accessorKey: 'staff',
    header: () => (
      <ColumnHeader label="Staff" className="!text-1 !font-medium" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.staff}</TextCell>,
  },
  {
    accessorKey: 'organization',
    header: () => (
      <ColumnHeader label="Organization" className="!text-1 !font-medium" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.organization}</TextCell>,
  },
  {
    id: 'comments',
    header: () => (
      <ColumnHeader label="Comments" className="!text-1 !font-medium" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.comments}</TextCell>,
  },
]

const DataTable = ({ data }: DataTableProps) => {
  return (
    <Flex
      direction="column"
      className="bg-white overflow-hidden rounded-1 shadow-4"
    >
      <Table columns={columns} data={data ?? []} />
    </Flex>
  )
}

export { DataTable }
