'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { formatDateOfBirth, getPatientAge, getPatientFullName } from '@/utils'
import { HistoryDateTimeCell } from './cells'
import { Patient } from './types'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'name',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {getPatientFullName(original.patientName)}
      </LongTextCell>
    ),
  },

  {
    id: 'age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {getPatientAge(original.patientDateOfBirth)}
      </LongTextCell>
    ),
  },
  {
    id: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">
        {formatDateOfBirth(patient?.patientDateOfBirth)}
      </TextCell>
    ),
  },
  {
    id: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.patientContactDetails?.phoneNumbers?.[0]?.number}
      </TextCell>
    ),
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">
        {patient?.patientContactDetails?.email}
      </TextCell>
    ),
  },
  {
    id: 'city',
    header: () => <ColumnHeader label="City" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">{patient?.city}</TextCell>
    ),
  },
  {
    id: 'state',
    header: () => <ColumnHeader label="State" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell>{patient?.state}</TextCell>
    ),
  },
  {
    id: 'contact',
    header: () => <ColumnHeader label="Contact Initiated" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">{patient?.contactStatus}</TextCell>
    ),
  },
  {
    id: 'updated-at',
    header: () => <ColumnHeader label="Updated Date/Time" />,
    cell: ({ row }) => <HistoryDateTimeCell row={row} />,
  },
  {
    id: 'updated-by',
    header: () => <ColumnHeader label="Updated By" />,
    cell: ({ row: { original: patient } }) => (
      <LongTextCell className="min-w-24">
        {patient.metadata?.createdByFullName}
      </LongTextCell>
    ),
  },
]

export { columns }
