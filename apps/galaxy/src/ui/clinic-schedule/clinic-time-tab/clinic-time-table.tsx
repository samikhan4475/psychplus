import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { formatDate } from '@/utils'
import { StateCell } from '../shared'
import {
  ActionCell,
  AgeGroupCell,
  CosignerCell,
  ServiceCell,
  StatusSelectCell,
  TelestateCell,
  TeleStateCosigner,
  VisitCell,
  VisitMedium,
} from './table-cells'
import { ClinicSchedule } from './types'
import { extractHoursAndMinsFromTime } from './utils'

interface ClinicScheduleWithApproveButton extends ClinicSchedule {
  showApproveButton?: boolean
  showTextStatus?: boolean
}
const columns: ColumnDef<ClinicScheduleWithApproveButton>[] = [
  {
    id: 'primary-state',
    accessorKey: 'stateCode',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary State" />
    ),
    cell: ({ row }) => <StateCell code={row.original.stateCode} />,
  },
  {
    id: 'primary-location',
    accessorKey: 'locationName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary Location" />
    ),
    cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
  },
  {
    id: 'cosigner',
    accessorKey: 'cosignerName',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Primary State Cosigner"
      />
    ),
    cell: ({ row }) => <CosignerCell row={row} />,
  },
  {
    id: 'tele-state',
    accessorKey: 'teleStates',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Tele State" />
    ),
    cell: ({ row }) => <TelestateCell row={row} />,
  },
  {
    id: 'service',
    accessorKey: 'serviceOffered',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Service" />
    ),
    cell: ({ row }) => <ServiceCell row={row} />,
  },
  {
    id: 'visit',
    accessorKey: 'visitTypes',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Type" />
    ),
    cell: ({ row }) => <VisitCell row={row} />,
  },
  {
    id: 'booking-frequency',
    accessorKey: 'maxBookingsPerSlot',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Booking Frequency" />
    ),
    cell: ({ row }) => <TextCell>{row.original.maxBookingsPerSlot}</TextCell>,
  },
  {
    id: 'day',
    accessorKey: 'dayOfSchedule',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Day" />
    ),
    cell: ({ row }) => <TextCell>{row.original.dayOfSchedule}</TextCell>,
  },
  {
    id: 'recurrence',
    accessorKey: 'weeklyRecurrence',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Recurrence" />
    ),
    cell: ({ row }) => <TextCell>{row.original.weeklyRecurrence}</TextCell>,
  },
  {
    id: 'timing',
    accessorKey: 'startTime',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Timing" />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">{`${extractHoursAndMinsFromTime(
        row.original.startTime,
      )}${
        row.original.endTime
          ? ` - ${extractHoursAndMinsFromTime(row.original.endTime)}`
          : ''
      }`}</TextCell>
    ),
  },
  {
    id: 'start-end-dates',
    accessorKey: 'startDate',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Start date/end date"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">
        {formatDate(row.original.startDate)}{' '}
        {row.original.endDate && `- ${formatDate(row.original.endDate)}`}
      </TextCell>
    ),
  },
  {
    id: 'visit-medium',
    accessorKey: 'visitMedium',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Medium" />
    ),
    cell: ({ row }) => <VisitMedium visit={row.original.visitMedium} />,
  },
  {
    id: 'age-group',
    accessorKey: 'ageGroups',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Age Group" />
    ),
    cell: ({ row }) => <AgeGroupCell row={row} />,
  },
  {
    id: 'public-view',
    accessorKey: 'isPublicViewable',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Public View" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.isPublicViewable ? 'Yes' : 'No'}</TextCell>
    ),
  },
  {
    id: 'tele-state-cosigner',
    accessorKey: 'teleStates',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Cosigner" />
    ),
    cell: ({ row }) => <TeleStateCosigner row={row} />,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        row={row}
        showTextStatus={row.original.showTextStatus}
      />
    ),
  },
  {
    id: 'actions-column',
    header: () => <ColumnHeader label="Action" className="!font-medium" />,
    cell: ({ row }) => (
      <ActionCell
        row={row}
        showApproveButton={row.original.showApproveButton}
      />
    ),
  },
]

interface ClinicTimeTableProps {
  data: ClinicScheduleWithApproveButton[]
}
const ClinicTimeTable = ({ data }: ClinicTimeTableProps) => {
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
