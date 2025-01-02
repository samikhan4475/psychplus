'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { useStore } from './store'
import { PatientFacilityHistory } from './types'

const columns: ColumnDef<PatientFacilityHistory>[] = [
  {
    id: 'metadata.createdOn',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Date/Time" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.metadata &&
          format(
            new Date(row?.original?.metadata.createdOn),
            'MM/dd/yyyy HH:mm',
          )}
      </TextCell>
    ),
  },
  {
    id: 'metadata.createdByFullName',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="User" />
    ),
    cell: ({ row }) => (
      <TextCell>{row?.original?.metadata.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'admissionDate',
    accessorKey: 'admissionDate',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Admit Date/Time" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.admissionDate &&
          format(new Date(row?.original?.admissionDate), 'MM/dd/yyyy HH:mm')}
      </TextCell>
    ),
  },
  {
    id: 'dischargeDate',
    accessorKey: 'dischargeDate',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Discharge Date" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.dischargeDate &&
          format(new Date(row?.original?.dischargeDate), 'MM/dd/yyyy HH:mm')}
      </TextCell>
    ),
  },
  {
    id: 'admittingProviderName.firstName',
    accessorKey: 'admittingProviderName.firstName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Admitting Provider" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {`${row.original.admittingProviderName.firstName} 
    ${row.original.admittingProviderName.lastName} 
    ${row.original.admittingProviderName.honors}`}
      </TextCell>
    ),
  },
]
const FacilityAdmissionTable = ({
  appointmentId,
}: {
  appointmentId: number
}) => {
  const { id } = useParams<{ id: string }>()

  const {
    patientFacilityData: data,
    patientFacilityLoader: loading,
    fetchPatientFacilityHistory,
  } = useStore()

  useEffect(() => {
    fetchPatientFacilityHistory(id, appointmentId)
  }, [id, appointmentId])

  return (
    <>
      {loading ? (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <DataTable columns={columns} data={data ?? []} />
      )}
    </>
  )
}

export { FacilityAdmissionTable }
