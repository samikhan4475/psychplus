import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ColumnHeader, TextCell } from '@/components'
import { StatusCell } from './cells/status-cell'
import { ClinicalStaffList } from './types'

const columns: ColumnDef<ClinicalStaffList>[] = [
  {
    id: 'clinical-staff',
    size: 10,
    header: () => (
      <ColumnHeader clientSideSort label="Clinical Support Staff" />
    ),
    cell: ({ row }) => <TextCell>{row.original.clinicalStaff}</TextCell>,
  },
  {
    id: 'added-on',
    header: () => <ColumnHeader clientSideSort label="Added on" />,
    cell: ({ row }) => (
      <TextCell>
        {format(new Date(row.original.addedOn), 'MM/dd/yyyy HH:mm')}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: () => <ColumnHeader clientSideSort label="Status" />,
    cell: ({ row }) => <StatusCell row={row} />,
  },
]

export { columns }
