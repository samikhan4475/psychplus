'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { useStore } from './store'
import { PatientScheduleStatusHistory } from './types'

const columns: ColumnDef<PatientScheduleStatusHistory>[] = [
  {
    id: 'scheduleStatusEntryTime',
    accessorKey: 'scheduleStatusEntryTime',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Date/Time"
        className="!text-black font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {formatDateTime(row.original.scheduleStatusEntryTime)}
      </TextCell>
    ),
  },
  {
    id: 'userName',
    accessorKey: 'userName',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="User"
        className="!text-black font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.userName} </TextCell>,
  },
  {
    id: 'scheduleStatus',
    accessorKey: 'scheduleStatus',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Status"
        className="!text-black font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.scheduleStatus} </TextCell>,
  },
]
const VisitStatusTable = ({ appointmentId }: { appointmentId: number }) => {
  const { id } = useParams<{ id: string }>()

  const {
    patientScheduleStatusData,
    patientScheduleStatusLoading,
    fetchPatientSchedulingStatusHistory,
  } = useStore()

  useEffect(() => {
    if (appointmentId) fetchPatientSchedulingStatusHistory(id, appointmentId)
  }, [])
  return (
    <>
      {patientScheduleStatusLoading ? (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <Box className="min-w-max">
          <DataTable
            columns={columns}
            data={patientScheduleStatusData ?? []}
            isRowSpan
          />
        </Box>
      )}
    </>
  )
}
export { VisitStatusTable }
