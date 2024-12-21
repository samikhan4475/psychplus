'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { StaffComment } from '@/types'
import { StaffCommentParams } from '@/ui/visit/types'
import { ActionCell } from './action-cell'
import { DateTimeCell } from './date-time-cell'

const columns = (
  fetchStaffComments: (payload: StaffCommentParams) => void,
): ColumnDef<StaffComment>[] => [
  {
    accessorKey: 'data_time',
    cell: DateTimeCell,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Date/Time"
        className="!text-1 !font-medium"
        sortable
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
        sortable
        column={column}
        className="!text-1 !font-medium"
        label="Staff Name"
      />
    ),
  },
  {
    id: 'comments',
    cell: ({ row }) => <TextCell>{row?.original?.comment}</TextCell>,
    header: () => (
      <ColumnHeader className="min-w-80 !text-1 !font-medium" label="Comment" />
    ),
  },
  {
    id: 'action',
    cell: ({ row }) => <ActionCell row={row} fetchComments={fetchStaffComments} />,
  },
]

const TreatmentTable = ({
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
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { TreatmentTable }
