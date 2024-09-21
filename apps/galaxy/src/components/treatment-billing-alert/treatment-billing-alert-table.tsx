'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { StaffComment } from '@/types'
import { ColumnHeader, DataTable, TextCell } from '../data-table'

const columns: ColumnDef<StaffComment>[] = [
  {
    id: 'date/time',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row }) => (
      <Flex gap="1">
        <TextCell>{row.original.date_time}</TextCell>
      </Flex>
    ),
  },
  {
    id: 'staff',
    header: ({ column }) => <ColumnHeader column={column} label="Staff" />,
    cell: ({ row }) => <TextCell>{row.original.staff} </TextCell>,
  },
  {
    id: 'comments',
    size: 600,
    header: ({ column }) => <ColumnHeader column={column} label="Comments" />,
    cell: ({ row }) => <TextCell>{row.original.comments}</TextCell>,
  },
]

interface TreatmentBillingAlertTableProps {
  data: StaffComment[]
}
const TreatmentBillingAlertTable = ({
  data,
}: TreatmentBillingAlertTableProps) => {
  return (
    <ScrollArea className="max-h-52">
      <DataTable
        columns={columns}
        data={data}
        sticky
        theadClass="bg-pp-focus-bg"
      />
    </ScrollArea>
  )
}

export { TreatmentBillingAlertTable }
