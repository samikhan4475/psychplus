import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ColumnHeader, TextCell } from '@/components'
import { getUserFullName } from '@/utils'
import { StatusCell } from './cells/status-cell'
import { CareTeam } from './types'
import { sortOnAddedOn } from './util'

const columns: (
  heading: string,
  providerStaffId: string,
  setAlertInfo: (alertInfo: { message: string; isOpen: boolean }) => void,
  isProfileView?: boolean,
) => ColumnDef<CareTeam>[] = (
  heading,
  providerStaffId,
  setAlertInfo,
  isProfileView,
) => [
  {
    accessorKey: 'staffName',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label={heading} />
    ),
    cell: ({ row }) => (
      <TextCell>{getUserFullName(row.original.staffName)}</TextCell>
    ),
  },
  {
    id: 'added-on',
    accessorFn: (row) => row.metadata?.createdOn,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Added on" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {format(new Date(row.original.metadata?.createdOn), 'MM/dd/yyyy HH:mm')}
      </TextCell>
    ),
    sortingFn: sortOnAddedOn,
  },
  {
    id: 'status',
    accessorKey: 'recordStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Status" />
    ),
    cell: ({ row }) => (
      <StatusCell
        row={row}
        isProfileView={isProfileView}
        providerStaffId={providerStaffId}
        setAlertInfo={setAlertInfo}
      />
    ),
  },
]

export { columns }
