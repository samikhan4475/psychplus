import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ColumnHeader, TextCell } from '@/components'
import { AdminStatusCell } from './cells/admin-status-cell'
import { StatusCell } from './cells/status-cell'
import { AdminList } from './types'

const columns: ColumnDef<AdminList>[] = [
  {
    id: 'admin',
    size: 200,
    header: () => <ColumnHeader clientSideSort label="Admin Name" />,
    cell: ({ row }) => <TextCell>{row.original.admin}</TextCell>,
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
    cell: ({ row }) => <AdminStatusCell row={row} />,
  },
]

export { columns }
