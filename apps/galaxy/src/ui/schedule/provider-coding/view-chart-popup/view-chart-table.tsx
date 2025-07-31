import { useRouter } from 'next/navigation'
import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Appointment } from '@/types'
import { capitalizeName, constructQuickNotesUrl, getPatientMRN } from '@/utils'
import { convertToZonedDate } from '../../utils'
import { extractWeekDay } from '../util'
import { ProviderTypeCell } from './cells/provider-type-cell'
import { VisitMediumCell } from './cells/visit-medium-cell'
import { VisitSequenceCell } from './cells/visit-sequence-cell'
import { VisitStatusCell } from './cells/visit-status-cell'

const TABLE_PAGE_SIZE = 200

const columns: ColumnDef<Appointment>[] = [
  {
    id: 'chart-table-datetime',
    accessorKey: 'appointmentDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Day/Date" />
    ),
    cell: ({ row }) => {
      const weekdayName = extractWeekDay(
        row.original.appointmentDate,
        row.original.locationTimezoneId,
      )
      return <TextCell>{weekdayName}</TextCell>
    },
    sortingFn: (a, b) => {
      const timeA = convertToZonedDate(
        a.original.appointmentDate,
        a.original.locationTimezoneId,
      )
      const timeB = convertToZonedDate(
        b.original.appointmentDate,
        b.original.locationTimezoneId,
      )
      return timeA.getTime() - timeB.getTime()
    },
  },
  {
    id: 'chart-table-visit-type',
    accessorKey: 'visitType',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Type" />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
  },
  {
    id: 'chart-table-visit-medium',
    accessorKey: 'visitMedium',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Medium" />
    ),
    cell: VisitMediumCell,
  },
  {
    id: 'chart-table-visit-sequence',
    accessorKey: 'visitSequence',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Sequence" />
    ),
    cell: VisitSequenceCell,
  },
  {
    id: 'chart-table-visit-status',
    accessorKey: 'visitStatus',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Status" />
    ),
    cell: VisitStatusCell,
  },
  {
    id: 'chart-table-provider-type',
    accessorKey: 'providerType',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Provider Type" />
    ),
    cell: ProviderTypeCell,
  },
  {
    id: 'chart-table-provider-name',
    accessorKey: 'providerName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Provider Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original.providerName}</TextCell>,
  },
  {
    id: 'chart-table-status',
    accessorKey: 'noteSignedStatus',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Note Signed Status" />
    ),
    cell: ({ row }) => <TextCell>{row.original.noteSignedStatus}</TextCell>,
  },
]

interface ChartTableProps {
  data: Appointment[]
  closeDialog: () => void
}
const ChartTable = ({ data, closeDialog }: ChartTableProps) => {
  const addTab = useRootStore((state) => state.addTab)
  const router = useRouter()

  const navigateToPatientChart = (row: Row<Appointment>) => {
    const href = constructQuickNotesUrl(
      row.original.patientId,
      row.original.appointmentId,
      row.original.visitTypeCode,
      row.original.visitSequence,
    )

    addTab({
      href,
      label: `${capitalizeName(row.original?.name)}-${getPatientMRN(
        row.original.patientId,
      )}-${row.original.appointmentId}`,
    })
    router.push(href)
    closeDialog()
  }

  return (
    <Box p="2" className="bg-white mt-[3px]">
      <ScrollArea
        scrollbars="vertical"
        className="max-h-[calc(100vh_-_200px)] w-full max-w-[calc(100vw_-_210px)]"
      >
        <DataTable
          columns={columns}
          data={data}
          onRowClick={navigateToPatientChart}
          initialPageSize={TABLE_PAGE_SIZE}
          defaultSorting={[
            { id: 'chart-table-datetime', desc: false },
            { id: 'chart-table-provider-type', desc: true },
          ]}
        />
      </ScrollArea>
    </Box>
  )
}

export { ChartTable }
