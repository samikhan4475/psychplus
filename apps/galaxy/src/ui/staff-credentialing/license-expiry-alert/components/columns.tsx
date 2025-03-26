import { parseAbsoluteToLocal } from '@internationalized/date'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { getSlashedDateString } from '@/utils'
import { GetLicensesResponse } from '../../types'
import { StateNameCell } from './state-name-cell'

const columns: ColumnDef<GetLicensesResponse>[] = [
  {
    accessorKey: 'stateCode',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="State" />
    ),
    cell: StateNameCell,
  },
  {
    accessorKey: 'licenseNumber',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="License #" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.licenseNumber}</TextCell>
    ),
  },
  {
    id: 'end-date',
    accessorKey: 'endDate',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="License Expiration Date"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {getSlashedDateString(row.original?.endDate?.toString() ?? '')}
      </TextCell>
    ),
    sortingFn: (a, b) => {
      const timeA = parseAbsoluteToLocal(a.original?.endDate ?? '')
      const timeB = parseAbsoluteToLocal(b.original?.endDate ?? '')
      return timeA.compare(timeB)
    },
  },
]

export { columns }
