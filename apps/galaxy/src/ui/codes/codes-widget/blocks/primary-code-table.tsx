import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { SelectOptionType } from '@/types'
import { CodeSelectCell } from '../cells/code-select-cell'

const FIELD = 'primaryCode'

export const primaryCodeData = [
  { label: '99202 ', value: '99202' },
  { label: '99203', value: '99203' },
  { label: '99204', value: '99204' },
  { label: '99205', value: '99205' },
]

const columns = (): ColumnDef<SelectOptionType>[] => [
  {
    id: 'codes-label',
    accessorKey: 'label',
    size: 400,
    header: ({ column }) => <ColumnHeader column={column} label="Primary" />,
    cell: ({ row }) => <TextCell>{row.original.label}</TextCell>,
  },
  {
    id: 'codes-select',
    accessorKey: 'value',
    size: 50,
    header: () => <ColumnHeader label="Select" />,
    cell: ({ row }) => <CodeSelectCell row={row} field={FIELD} />,
  },
]
const PrimaryCodeTable = () => {
  return (
    <DataTable
      data={primaryCodeData ?? []}
      columns={columns()}
      disablePagination
      sticky
    />
  )
}

export { PrimaryCodeTable }
