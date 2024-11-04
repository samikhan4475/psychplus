import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { SelectOptionType } from '@/types'
import { CodeSelectCell } from '../cells/code-select-cell'

const FIELD = 'modifierCode'
export const modifierCodeData = [
  { label: '25', value: '25' },
  { label: '59', value: '59' },
  { label: '95', value: '95' },
]
const columns: ColumnDef<SelectOptionType>[] = [
  {
    id: 'codes-modifier',
    accessorKey: 'label',
    size: 400,
    header: ({ column }) => <ColumnHeader column={column} label="Modifier" />,
    cell: ({ row }) => <TextCell>{row.original.label}</TextCell>,
  },
  {
    id: 'codes-select',
    accessorKey: 'checked',
    size: 50,
    header: () => <ColumnHeader label="" />,
    cell: ({ row }) => <CodeSelectCell row={row} field={FIELD} />,
  },
]

const ModifierTable = () => {
  return (
    <DataTable
      data={modifierCodeData ?? []}
      columns={columns}
      disablePagination
      sticky
    />
  )
}

export { ModifierTable }
