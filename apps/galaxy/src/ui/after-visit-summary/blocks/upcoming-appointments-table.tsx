'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { Appointment } from '@/types'
import { formatDateTime } from '@/utils'

interface UpcomingAppointmentsTableProps {
  appointments: Appointment[]
}

const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    id: 'dateTime',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row.original.appointmentDate, true)}</TextCell>
    ),
  },
  {
    id: 'provider',
    header: () => <ColumnHeader label="Provider" />,
    cell: ({ row }) => <TextCell>{row.original.providerName}</TextCell>,
  },
  {
    id: 'location',
    header: () => <ColumnHeader label="Location" />,
    cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
  },
  {
    id: 'service',
    header: () => <ColumnHeader label="Service" />,
    cell: ({ row }) => <TextCell>{row.original.service}</TextCell>,
  },
  {
    id: 'visitType',
    header: () => <ColumnHeader label="Visit Type" />,
    cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
  },
]

const UpcomingAppointmentsTable = ({
  appointments,
}: UpcomingAppointmentsTableProps) => {
  return (
    <Box>
      <ScrollArea className="max-h-[49vh]">
        <DataTable
          columns={appointmentColumns}
          data={appointments ?? []}
          theadClass="bg-indigo-3 z-10"
        />
      </ScrollArea>
    </Box>
  )
}

export { UpcomingAppointmentsTable }
