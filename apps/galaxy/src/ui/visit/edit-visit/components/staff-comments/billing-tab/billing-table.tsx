'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { StaffComment } from '@/types'
import { StaffCommentParams } from '@/ui/visit/types'
import { ActionCell } from './action-cell'
import { DateTimeCell } from './date-time-cell'

const columns = (
  fetchComments: (payload: StaffCommentParams) => void,
): ColumnDef<StaffComment>[] => [
  {
    cell: DateTimeCell,
    accessorKey: 'data_time',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        column={column}
        className="!text-1 !font-medium"
        label="Date/Time"
      />
    ),
  },
  {
    accessorKey: 'staff',
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.staffName?.firstName}{' '}
        {row?.original?.staffName?.lastName}
      </TextCell>
    ),
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Staff Name"
        className="!text-1 !font-medium"
      />
    ),
  },
  {
    id: 'comments',
    header: () => (
      <ColumnHeader className="min-w-80 !text-1 !font-medium" label="Comment" />
    ),
    cell: ({ row }) => <TextCell className='[overflow-wrap:anywhere]'>{row?.original?.comment}</TextCell>,
  },
  {
    id: 'action',
    cell: ({ row }) => <ActionCell row={row} fetchComments={fetchComments} />,
  },
]

const BillingTable = ({
  data,
  fetchStaffComments,
}: {
  data: StaffComment[]
  fetchStaffComments: (payload: StaffCommentParams) => void
}) => {
  return (
    <ScrollArea className="max-h-[150px]">
      <DataTable
        data={data}
        columns={columns(fetchStaffComments)}
        sticky
        disablePagination
      />
    </ScrollArea>
  )
}

export { BillingTable }
