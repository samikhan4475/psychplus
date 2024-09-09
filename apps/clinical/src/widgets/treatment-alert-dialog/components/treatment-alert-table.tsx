'use client'

import { Box } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@psychplus/ui/cn'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { TableCellText } from '@psychplus/ui/table-cell'
import { alertType, Comment, TreatmentAlertTableProps } from '../types'

const data: Comment[] = [
  {
    comment:
      "The EHR's scheduling module has made appointment management much easier and more organized. It’s great to have automated reminders for both patients and staff.",
    date: '03/12/24 00:00',
    staff: 'John Smith, MD',
  },
]
const columns: ColumnDef<Comment>[] = [
  {
    id: 'data_time',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date/Time"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row?.original?.date} />,
  },
  {
    id: 'staff',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Staff"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row?.original?.staff} />,
  },
  {
    id: 'comments',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Comments"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellText
        text={row?.original?.comment}
        className="whitespace-normal"
      />
    ),
  },
]

const TreatmentAlertTable = ({ type }: TreatmentAlertTableProps) => {
  return (
    <Box
      className={cn(
        'border-b border-t border-solid border-[#DDDDE3] px-[20px] py-3',
        {
          'border-t-0': type === alertType.Treatment,
        },
      )}
    >
      <DataTable
        tableClass={cn('bg-[#fff]', {
          'bg-[#FFE5E5]': type === alertType.Treatment,
        })}
        tHeadClass={cn('bg-[#F0F4FF]', {
          'bg-[#fff]': type === alertType.Treatment,
        })}
        columnCellClass={cn(
          'pl-1 border border-[#D9E2FC] [box-shadow:none] text-3 font-medium',
          {
            'border-[#60646C]': type === alertType.Treatment,
          },
        )}
        thClass={cn('pl-1 border border-[#D9E2FC] text-left text-3', {
          'border-[#fff]': type === alertType.Treatment,
        })}
        data={data}
        columns={columns}
        disablePagination
      />
    </Box>
  )
}
export { TreatmentAlertTable }
