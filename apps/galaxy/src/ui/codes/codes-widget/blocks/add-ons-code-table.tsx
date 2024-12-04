import { ColumnDef } from '@tanstack/react-table'
import { Path } from 'react-hook-form'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { SelectOptionType } from '@/types'
import { CodeSelectCell } from '../cells/code-select-cell'
import { CodesWidgetSchemaType } from '../codes-widget-schema'

const FIELD: Path<CodesWidgetSchemaType> = 'cptAddonCodes'

const columns = (isDisabled?: boolean): ColumnDef<SelectOptionType>[] => [
  {
    id: 'codes-addon',
    accessorKey: 'label',
    size: 400,
    header: ({ column }) => <ColumnHeader column={column} label="Addons" />,
    cell: ({
      row: {
        original: { label, value },
      },
    }) => <TextCell>{`${value} ${label}`}</TextCell>,
  },
  {
    id: 'codes-value',
    accessorKey: 'value',
    size: 50,
    header: () => <ColumnHeader label=" " />,
    cell: ({ row }) => (
      <CodeSelectCell row={row} field={FIELD} isDisabled={isDisabled} />
    ),
  },
]
interface AddonsTableProps {
  codes: SelectOptionType[]
  isDisabled?: boolean
}
const AddonsTable = ({ codes, isDisabled }: AddonsTableProps) => {
  if (!codes?.length) {
    return null
  }
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

export { AddonsTable }
