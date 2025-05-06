import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDate } from '@/utils'
import { ActionsCell, StatusCell } from './cells'
import { SchedulesListTablePagination } from './schedules-list-table-pagination'
import { useStore } from './store'
import { ScheduledReport, VIEW_TYPE } from './types'

const columns: ColumnDef<ScheduledReport>[] = [
  {
    id: 'beginOn',
    accessorKey: 'beginOn',
    header: () => <ColumnHeader label="Start Date" />,
    cell: ({ row }) => (
      <DateCell>{formatDate(row.original.beginOn) ?? 'N/A'}</DateCell>
    ),
  },
  {
    id: 'repeat-schedule',
    header: () => <ColumnHeader label="Repeat Schedule" />,
    cell: ({ row }) => (
      <TextCell>{row.original.cronExpressionDescription || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'terminateOn',
    accessorKey: 'terminateOn',
    header: () => <ColumnHeader label="End Date" />,
    cell: ({ row }) => (
      <DateCell>{formatDate(row.original.terminateOn) ?? ''}</DateCell>
    ),
  },
  {
    id: 'distribution-groups',
    accessorKey: 'distributionGroups',
    header: () => <ColumnHeader label="Distribution Groups" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.distributionGroups?.map(
          (distributionGroup) => distributionGroup.distributionGroupDisplayName,
        ) ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'resourceStatus',
    accessorKey: 'resourceStatus',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'actions',
    accessorKey: 'Actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const SchedulesListTable = () => {
  const {
    selectedTemplate,
    searchScheduledReports,
    scheduleReportLoading,
    viewType,
  } = useStore((state) => ({
    selectedTemplate: state.selectedTemplate,
    searchScheduledReports: state.searchScheduledReports,
    scheduleReportLoading: state.scheduleReportLoading,
    viewType: state.viewType,
  }))
  const { scheduleReports } = useStore()

  useEffect(() => {
    if (selectedTemplate?.id) {
      searchScheduledReports({ templateIds: [selectedTemplate.id] })
    }
  }, [
    viewType === VIEW_TYPE.SCHEDULE,
    selectedTemplate?.id,
    searchScheduledReports,
  ])

  if (scheduleReportLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      <Box className="bg-white rounded mt-1 w-full p-1">
        <DataTable
          data={scheduleReports?.scheduleReports ?? []}
          columns={columns}
          isRowSpan
          theadClass="z-[1]"
        />
      </Box>
      <SchedulesListTablePagination />
    </>
  )
}

export { SchedulesListTable }
