import React from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { getMaskedPhoneNumber } from '@/utils'
import { PatientPersonInfo } from '../types'

const columns: ColumnDef<PatientPersonInfo>[] = [
  {
    id: 'patientGender',
    accessorKey: 'patientGender',
    header: () => <ColumnHeader label="Gender" />,
    cell: ({ row }) => <TextCell>{row.original?.patientGender}</TextCell>,
  },
  {
    id: 'patientDateOfBirth',
    accessorKey: 'patientDateOfBirth',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row }) => <TextCell>{row.original?.patientDateOfBirth}</TextCell>,
  },
  {
    id: 'patientAddressLine1',
    accessorKey: 'patientAddressLine1',
    header: () => <ColumnHeader label="Address" />,
    cell: ({ row }) => <TextCell>{row.original?.patientAddressLine1}</TextCell>,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row }) => (
      <TextCell className="truncate">
        {getMaskedPhoneNumber(row?.original?.phone ?? '')}
      </TextCell>
    ),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row }) => <TextCell>{row.original?.email}</TextCell>,
  },
]
interface PatientInfoTableProps {
  patient: PatientPersonInfo[]
}
const PatientInfoTable = ({ patient }: PatientInfoTableProps) => {
  return (
    <ScrollArea>
      <DataTable data={patient} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { PatientInfoTable }
