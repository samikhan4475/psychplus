import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Appointment } from '@/types'
import { formatDateCell, formatTimeCell } from '@/ui/schedule/utils'
import { formatDateOfBirth } from '@/utils'
import { ActionsCell } from './cells/action-cell'
import { VisitStatusCell } from './cells/visit-status-cell'
import { sortOnAppointmentDate, sortOnDob } from './util'

const columns: (
  viewAppointment: (appointment: Appointment) => void,
  refetch: () => void,
) => ColumnDef<Appointment>[] = (viewAppointment, refetch) => [
  {
    accessorKey: 'date/time',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">
        {formatDateCell(
          row.original.appointmentDate,
          row.original.locationTimezoneId,
          false,
        )}{' '}
        {formatTimeCell(
          row.original.appointmentDate,
          row.original.locationTimezoneId,
        )}
      </TextCell>
    ),
    sortingFn: sortOnAppointmentDate,
  },
  {
    accessorKey: 'name',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Patient Name" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.name}</TextCell>
    ),
  },
  {
    accessorKey: 'gender',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Gender" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.gender}</TextCell>
    ),
  },
  {
    id: 'dob',
    accessorKey: 'dob',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="DOB" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">
        {formatDateOfBirth(row.original.dob)}
      </TextCell>
    ),
    sortingFn: sortOnDob,
  },
  {
    id: 'patientId',
    accessorKey: 'patientId',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="MRN" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.patientId}</TextCell>
    ),
  },
  {
    id: 'visitId',
    accessorKey: 'appointmentId',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit ID" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.appointmentId}</TextCell>
    ),
  },
  {
    id: 'location',
    accessorKey: 'locationName',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.locationName}</TextCell>
    ),
  },
  {
    id: 'visitType',
    accessorKey: 'visitType',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Type" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.visitType}</TextCell>
    ),
  },
  {
    id: 'visitStatus',
    accessorKey: 'visitStatus',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Status" />
    ),
    cell: VisitStatusCell,
  },
  {
    id: 'actions-column',
    size: 50,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ({ row }) => (
      <ActionsCell
        row={row}
        viewAppointment={viewAppointment}
        refetch={refetch}
      />
    ),
  },
]

export { columns }
