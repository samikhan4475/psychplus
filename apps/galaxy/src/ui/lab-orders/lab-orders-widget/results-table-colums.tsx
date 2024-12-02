import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DateTimeCell, TextCell } from '@/components'
import { LabResult } from '@/types'
import { formatDateTime, getUserFullName } from '@/utils'
import { FlagStatusCell } from './cells/lab-flag-status'
import { ResultStatusCell } from './cells/result-status-cell'

const columns: ColumnDef<LabResult>[] = [
  {
    id: 'test-name',
    header: () => <ColumnHeader clientSideSort label="Test Name" />,
    cell: ({ row }) => <TextCell>{row.original.resultName}</TextCell>,
  },
  {
    id: 'date-time',
    header: () => <ColumnHeader clientSideSort label="Date/Time" />,
    cell: ({ row }) => (
      <DateTimeCell>
        {formatDateTime(row.original.observationTime)}
      </DateTimeCell>
    ),
  },
  {
    id: 'result-value',
    header: () => <ColumnHeader clientSideSort label="Result" />,
    cell: ({ row }) => <TextCell>{row.original.resultValue}</TextCell>,
  },
  {
    id: 'unit',
    header: () => <ColumnHeader clientSideSort label="Unit" />,
    cell: ({ row }) => <TextCell>{row.original.resultValueUnit}</TextCell>,
  },
  {
    id: 'code',
    header: () => <ColumnHeader clientSideSort label="Code" />,
    cell: ({ row }) => <TextCell>{row.original.resultCode}</TextCell>,
  },
  {
    id: 'ref-range',
    header: () => <ColumnHeader clientSideSort label="Ref. Range" />,
    cell: ({ row }) => <TextCell>{row.original.recomendedValue}</TextCell>,
  },
  {
    id: 'flag',
    header: () => <ColumnHeader clientSideSort label="Flag" />,
    cell: ({ row }) => <FlagStatusCell row={row} />,
  },
  {
    id: 'status',
    header: () => <ColumnHeader clientSideSort label="Status" />,
    cell: ({ row }) => <ResultStatusCell row={row} />,
  },
  {
    id: 'notes',
    header: () => <ColumnHeader clientSideSort label="Notes" />,
    cell: ({ row }) => <TextCell>{row.original.physicianComments}</TextCell>,
  },
]
export { columns }
