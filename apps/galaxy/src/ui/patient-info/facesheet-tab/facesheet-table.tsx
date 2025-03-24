'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { Facesheet } from '@/types'
import { formatDateTime } from '@/utils'
import {
  FacilityAdmissionIdCell,
  ImageView,
  StatusCell,
  VisitIdCell,
} from './cells'

type PatientVisits = {
  appointmentId: number
  appointmentEncounterNo: string
  facilityAdmissionDetailId: string
  facilityAdmissionId: number
}
interface FacesheetTableProps {
  facesheets: Facesheet[]
  handleUpdateStatus: (facesheetId: string, status: string) => void
  patientVisits: PatientVisits[]
  onVisitSelect: (facesheet: Facesheet) => void
}

const FacesheetTable = ({
  facesheets,
  handleUpdateStatus,
  patientVisits,
  onVisitSelect,
}: FacesheetTableProps) => {
  const facesheetColumns: ColumnDef<Facesheet>[] = [
    {
      id: 'staff',
      accessorKey: 'staff',
      header: () => <ColumnHeader label="Staff" />,
      cell: ({ row }) => (
        <TextCell className="!text-1">
          {row.original.metadata.createdByFullName}
        </TextCell>
      ),
    },
    {
      id: 'dateTime',
      accessorKey: 'dateTime',
      header: () => <ColumnHeader label="Date/Time" />,
      cell: ({ row }) => (
        <TextCell className="!text-1">
          {formatDateTime(row.original.metadata.createdOn, false) ?? 'N/A'}
        </TextCell>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: () => <ColumnHeader label="Status" />,
      cell: ({ row }) => (
        <StatusCell
          visit={row.original}
          handleUpdateStatus={handleUpdateStatus}
        />
      ),
    },
    {
      id: 'visitId',
      accessorKey: 'visitId',
      header: () => <ColumnHeader label="Visit ID" />,
      cell: ({ row }) => (
        <VisitIdCell
          visit={row.original}
          patientVisits={patientVisits}
          onVisitSelect={onVisitSelect}
        />
      ),
    },
    {
      id: 'facilityAdmissionId',
      accessorKey: 'facilityAdmissionId',
      header: () => <ColumnHeader label="Facility Admission ID" />,
      cell: ({ row }) => (
        <FacilityAdmissionIdCell
          patientVisits={patientVisits}
          facilityAdmissionId={row.original.facilityAdmissionId}
        />
      ),
    },
    {
      id: 'facesheet',
      size: 50,
      header: () => <ColumnHeader label="Facesheet" />,
      cell: ({ row }) => <ImageView visit={row.original} />,
    },
  ]

  return (
    <Box className="bg-white rounded-1 p-2 pb-0">
      <ScrollArea className="max-h-[49vh] pb-2">
        <DataTable
          columns={facesheetColumns}
          data={facesheets ?? []}
          theadClass="bg-indigo-3 z-10"
        />
      </ScrollArea>
    </Box>
  )
}

export { FacesheetTable }
