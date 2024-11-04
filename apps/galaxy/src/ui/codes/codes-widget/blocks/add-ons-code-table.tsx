import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { SelectOptionType } from '@/types'
import { CodeSelectCell } from '../cells/code-select-cell'

const FIELD = 'addOns'
export const addOnCodeData = [
  {
    label: '96127 (screening questions)',
    value: '96127',
  },
  {
    label: '96127 (screening questions)',
    value: '96127',
  },
  {
    label: '96372 (injection)',
    value: '96372',
  },
  {
    label: '90833 (therapy 16 min)',
    value: '90833',
  },
  {
    label: '90836 (therapy 38 min)',
    value: '90836',
  },
  {
    label: '90838 (therapy 52 min)',
    value: '90838',
  },
  {
    label: '90845 (psychoanalysis)',
    value: '90845',
  },
  {
    label: '90785 (interactive complexity)',
    value: '90785',
  },
  {
    label: '99406 (smoking 3 min)',
    value: '99406',
  },
  {
    label: '99407 (smoking 11 min)',
    value: '99407',
  },
  {
    label: '99408 (alcohol-sa 15 min)',
    value: '99408',
  },
  {
    label: '99409 (alcohol-sa 31 min)',
    value: '99409',
  },
  {
    label: '99050 (afterhours)',
    value: '99050',
  },
]

const columns: ColumnDef<SelectOptionType>[] = [
  {
    id: 'codes-addon',
    accessorKey: 'label',
    size: 400,
    header: ({ column }) => <ColumnHeader column={column} label="Addons" />,
    cell: ({ row }) => <TextCell>{row.original.label}</TextCell>,
  },
  {
    id: 'codes-value',
    accessorKey: 'value',
    size: 50,
    header: () => <ColumnHeader label=" " />,
    cell: ({ row }) => <CodeSelectCell row={row} field={FIELD} />,
  },
]
const AddonsTable = () => {
  return (
    <DataTable
      data={addOnCodeData ?? []}
      columns={columns}
      disablePagination
      sticky
    />
  )
}

export { AddonsTable }
