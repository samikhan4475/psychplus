'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { StaffComment } from '@/types'
import { ColumnHeader, DataTable, TextCell } from '../data-table'

const columns: ColumnDef<StaffComment>[] = [
  {
    id: 'commentedOn',
    accessorKey: 'commentedOn',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Date/Time" />
    ),
    cell: ({ row }) => (
      <Flex gap="1">
        <TextCell>
          {row.original.commentedOn &&
            format(new Date(row.original.commentedOn), 'MM/dd/yyy HH:mm')}
        </TextCell>
      </Flex>
    ),
  },
  {
    id: 'staffName?.firstName',
    accessorKey: 'staffName?.firstName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Staff" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.staffName?.firstName} {row.original.staffName?.lastName}
        {row.original.staffName?.title}
      </TextCell>
    ),
  },
  {
    id: 'comments',
    size: 600,
    header: ({ column }) => <ColumnHeader column={column} label="Comments" />,
    cell: ({ row }) => <TextCell>{row.original.comment}</TextCell>,
  },
]

interface TreatmentBillingAlertTableProps {
  data: StaffComment[]
}
const TreatmentBillingAlertTable = ({
  data,
}: TreatmentBillingAlertTableProps) => {
  return (
    <ScrollArea className="mt-2 max-h-52">
      <DataTable
        columns={columns}
        data={data}
        sticky
        theadClass="bg-pp-focus-bg"
        tableRowClass="bg-[white]"
      />
    </ScrollArea>
  )
}

export { TreatmentBillingAlertTable }
