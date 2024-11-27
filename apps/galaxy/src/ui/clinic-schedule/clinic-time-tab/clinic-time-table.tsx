import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { ClinicTime } from '../types'
import {
  ActionCell,
  AgeGroupCell,
  CosignerCell,
  ServiceCell,
  StatusSelectCell,
  TelestateCell,
} from './table-cells'

const columns: ColumnDef<ClinicTime>[] = [
  {
    id: 'primary-state',
    accessorKey: 'primaryState',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary State" />
    ),
    cell: ({ row }) => <TextCell>{row.original.primaryState}</TextCell>,
  },
  {
    id: 'primary-location',
    accessorKey: 'primaryLocation',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary Location" />
    ),
    cell: ({ row }) => <TextCell>{row.original.primaryLocation}</TextCell>,
  },
  {
    id: 'tele-state',
    accessorKey: 'teleState',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Tele State" />
    ),
    cell: ({ row }) => <TelestateCell row={row} />,
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Service" />
    ),
    cell: ({ row }) => <ServiceCell row={row} />,
  },
  {
    id: 'day',
    accessorKey: 'day',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Day" />
    ),
    cell: ({ row }) => <TextCell>{row.original.day}</TextCell>,
  },
  {
    id: 'recurrence',
    accessorKey: 'recurrence',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Recurrence" />
    ),
    cell: ({ row }) => <TextCell>{row.original.recurrence}</TextCell>,
  },
  {
    id: 'timing',
    accessorKey: 'timing',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Timing" />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">{row.original.timing}</TextCell>
    ),
  },
  {
    id: 'start-end-dates',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Start date/end date"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">
        {row.original.startDate} - {row.original.endDate}
      </TextCell>
    ),
  },
  {
    id: 'booking-frequency',
    accessorKey: 'bookingFrequency',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Booking Frequency" />
    ),
    cell: ({ row }) => <TextCell>{row.original.bookingFrequency}</TextCell>,
  },
  {
    id: 'visit-medium',
    accessorKey: 'visitMedium',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Medium" />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitMedium}</TextCell>,
  },
  {
    id: 'age-group',
    accessorKey: 'ageGroup',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Age Group" />
    ),
    cell: ({ row }) => <AgeGroupCell row={row} />,
  },
  {
    id: 'cosigner',
    accessorKey: 'cosigner',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Cosigner" />
    ),
    cell: ({ row }) => <CosignerCell row={row} />,
  },
  {
    id: 'public-view',
    accessorKey: 'publicView',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Public View" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.publicView ? 'Yes' : 'No'}</TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: ({ row }) => <StatusSelectCell />,
  },
  {
    id: 'actions-column',
    header: () => <ColumnHeader label="Action" className="!font-medium" />,
    cell: ({ row }) => <ActionCell row={row} />,
  },
]

const data = [
  {
    primaryState: 'California',
    primaryLocation: 'Los Angeles',
    teleState: 'California',
    service: 'Outpatient Psychiatry',
    day: 'Monday',
    recurrence: 'Weekly',
    timing: '9:00 AM - 5:00 PM',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    bookingFrequency: '2',
    visitMedium: 'In-Person',
    ageGroup: 'Adult',
    cosigner: 'Dr. Smith',
    publicView: true,
    status: 'Active',
  },
  {
    primaryState: 'Texas',
    primaryLocation: 'Houston',
    teleState: 'Texas',
    service: 'Outpatient Psychiatry',
    day: 'Tuesday',
    recurrence: 'Biweekly',
    timing: '10:00 AM - 3:00 PM',
    startDate: '2024-12-05',
    endDate: '2025-01-05',
    bookingFrequency: '2',
    visitMedium: 'Virtual',
    ageGroup: 'Child',
    cosigner: 'Dr. Johnson',
    publicView: true,
    status: 'Active',
  },
  {
    primaryState: 'New York',
    primaryLocation: 'New York City',
    teleState: 'New York',
    service: 'Outpatient Psychiatry',
    day: 'Wednesday',
    recurrence: 'Monthly',
    timing: '1:00 PM - 6:00 PM',
    startDate: '2024-12-10',
    endDate: '2025-06-10',
    bookingFrequency: '2',
    visitMedium: 'In-Person',
    ageGroup: 'Adolescent',
    cosigner: 'Dr. Lee',
    publicView: false,
    status: 'Active',
  },
  {
    primaryState: 'Florida',
    primaryLocation: 'Miami',
    teleState: 'Florida',
    service: 'Outpatient Psychiatry',
    day: 'Thursday',
    recurrence: 'Weekly',
    timing: '8:00 AM - 12:00 PM',
    startDate: '2024-12-02',
    endDate: '2024-12-30',
    bookingFrequency: '2',
    visitMedium: 'In-Person',
    ageGroup: 'Aolescent',
    cosigner: 'Dr. Brown',
    publicView: true,
    status: 'Active',
  },
  {
    primaryState: 'Illinois',
    primaryLocation: 'Chicago',
    teleState: 'Illinois',
    service: 'Outpatient Psychiatry',
    day: 'Friday',
    recurrence: 'Triweekly',
    timing: '11:00 AM - 4:00 PM',
    startDate: '2024-12-15',
    endDate: '2025-02-15',
    bookingFrequency: '2',
    visitMedium: 'Virtual',
    ageGroup: 'Adult',
    cosigner: 'Dr. Green',
    publicView: true,
    status: 'Inactive',
  },
]

const ClinicTimeTable = () => {
  return (
    <Box p="2" className="bg-white mt-[3px]">
      <ScrollArea
        scrollbars="horizontal"
        className="w-full max-w-[calc(100vw_-_210px)]"
      >
        <DataTable columns={columns} data={data} />
      </ScrollArea>
    </Box>
  )
}

export { ClinicTimeTable }
