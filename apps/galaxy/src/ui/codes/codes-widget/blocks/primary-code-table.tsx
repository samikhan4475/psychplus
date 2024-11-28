import { ColumnDef } from '@tanstack/react-table'
import { Path } from 'react-hook-form'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { SelectOptionType } from '@/types'
import { CodeSelectCell, PrimaryHeaderCell } from '../cells'
import { CodesWidgetSchemaType } from '../codes-widget-schema'

const FIELD: Path<CodesWidgetSchemaType> = 'cptPrimaryCodes'

const columns = (isDisabled?: boolean): ColumnDef<SelectOptionType>[] => [
  {
    id: 'codes-label',
    accessorKey: 'label',
    size: 400,
    header: PrimaryHeaderCell,
    cell: ({
      row: {
        original: { label, value },
      },
    }) => <TextCell>{`${value} ${label}`}</TextCell>,
  },
  {
    id: 'codes-select',
    accessorKey: 'value',
    size: 50,
    header: () => <ColumnHeader label="Select" />,
    cell: ({ row }) => (
      <CodeSelectCell row={row} field={FIELD} isDisabled={isDisabled} />
    ),
  },
]

interface PrimaryCodeTableProps {
  codes: SelectOptionType[]
  isDisabled?: boolean
}
const PrimaryCodeTable = ({ codes, isDisabled }: PrimaryCodeTableProps) => {
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

export { PrimaryCodeTable }
