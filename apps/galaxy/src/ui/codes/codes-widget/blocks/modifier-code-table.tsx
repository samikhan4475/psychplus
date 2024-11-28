import { ColumnDef } from '@tanstack/react-table'
import { Path } from 'react-hook-form'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { SelectOptionType } from '@/types'
import { CodeSelectCell } from '../cells/code-select-cell'
import { CodesWidgetSchemaType } from '../codes-widget-schema'

const FIELD: Path<CodesWidgetSchemaType> = 'cptmodifierCodes'

const columns = (isDisabled?: boolean): ColumnDef<SelectOptionType>[] => [
  {
    id: 'codes-modifier',
    accessorKey: 'label',
    size: 400,
    header: ({ column }) => <ColumnHeader column={column} label="Modifier" />,
    cell: ({
      row: {
        original: { label, value },
      },
    }) => <TextCell>{`${value} ${label}`}</TextCell>,
  },
  {
    id: 'codes-select',
    accessorKey: 'checked',
    size: 50,
    header: () => <ColumnHeader label="" />,
    cell: ({ row }) => (
      <CodeSelectCell row={row} field={FIELD} isDisabled={isDisabled} />
    ),
  },
]

interface ModifierTableProps {
  codes: SelectOptionType[]
  isDisabled?: boolean
}
const ModifierTable = ({ codes, isDisabled }: ModifierTableProps) => {
  return (
    <DataTable
      data={codes ?? []}
      columns={columns(isDisabled)}
      theadClass="z-[1]"
      disablePagination
      sticky
    />
  )
}

export { ModifierTable }
