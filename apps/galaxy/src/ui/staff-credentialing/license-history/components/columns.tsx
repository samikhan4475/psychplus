import { parseAbsoluteToLocal } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { ColumnHeader, DateCell, TextCell } from '@/components'
import {
  getSlashedDateString,
  getSlashedPaddedDateString,
  getTimeLabel,
} from '@/utils'
import { License } from '../../types'

const columns: ColumnDef<License>[] = [
  {
    accessorFn: (row) => row.metadata?.createdOn,
    id: 'history-date-time',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <Flex justify="between" width="100%" align="center" className="px-1">
        <DateCell>
          {getSlashedPaddedDateString(row.original?.metadata?.createdOn ?? '')}
        </DateCell>
        <DateCell className="text-pp-gray-1">
          {getTimeLabel(row.original?.metadata?.createdOn ?? '')}
        </DateCell>
      </Flex>
    ),
    sortingFn: (a, b) => {
      const timeA = parseAbsoluteToLocal(a.original?.metadata?.createdOn ?? '')
      const timeB = parseAbsoluteToLocal(b.original?.metadata?.createdOn ?? '')
      return timeA.compare(timeB)
    },
  },
  {
    accessorFn: (row) => row.metadata?.createdByFullName,
    id: 'history-user',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="User" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">
        {row.original?.metadata?.createdByFullName}
      </TextCell>
    ),
  },
  {
    accessorKey: 'licenseNumber',
    id: 'history-license',
    enableSorting: true,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="License #" sortable />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.licenseNumber}</TextCell>
    ),
  },
  {
    id: 'history-start-date',
    accessorKey: 'startDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Start Date" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">
        {getSlashedDateString(row.original?.startDate?.toString() ?? '')}
      </TextCell>
    ),
    sortingFn: (a, b) => {
      const dateA = a.original?.startDate as DateValue
      const dateB = b.original?.startDate as DateValue
      return dateA?.compare(dateB)
    },
    enableSorting: true,
  },
  {
    id: 'history-end-date',
    accessorKey: 'endDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="End Date" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">
        {getSlashedDateString(row.original?.endDate?.toString() ?? '')}
      </TextCell>
    ),
    sortingFn: (a, b) => {
      const dateA = a.original?.endDate as DateValue
      const dateB = b.original?.endDate as DateValue
      return dateA?.compare(dateB)
    },
  },
]

export { columns }
