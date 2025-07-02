'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { getMaskedPhoneNumber } from '@/utils'
import { GuardianCell, UpdatedDateTimeCell, UserStatusCell } from './cells'
import { StatusIcon } from './status-icon'
import { Patient } from './types'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'name',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original: patient } }) => (
      <LongTextCell className="min-w-24">{patient?.name}</LongTextCell>
    ),
  },

  {
    id: 'age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell>{patient?.age}</TextCell>
    ),
  },
  {
    id: 'patient-gender',
    header: () => <ColumnHeader label="Gen." />,
    cell: ({ row: { original: patient } }) => (
      <TextCell>{patient?.gender}</TextCell>
    ),
  },
  {
    id: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">{patient?.dob}</TextCell>
    ),
  },
  {
    id: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">
        {getMaskedPhoneNumber(patient?.phoneNumber ?? '')}
      </TextCell>
    ),
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">{patient?.contactDetails?.email}</TextCell>
    ),
  },
  {
    id: 'ss',
    header: () => <ColumnHeader label="SS" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">{patient?.socialSecurityNumber}</TextCell>
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
    id: 'residence',
    header: () => <ColumnHeader label="Residence (State)" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell>{patient?.residence}</TextCell>
    ),
  },

  {
    id: 'zip',
    header: () => <ColumnHeader label="Zip" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell>{patient?.zip}</TextCell>
    ),
  },
  {
    id: 'areaCode',
    header: () => <ColumnHeader label="AreaCode" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell>{patient?.postalPlus4Code ?? ''}</TextCell>
    ),
  },
  {
    id: 'gaurdian',
    header: () => <ColumnHeader label="Gaurdian" />,
    cell: ({ row }) => <GuardianCell row={row} />,
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="User Status" />,
    cell: ({ row }) => <UserStatusCell row={row} />,
  },
  {
    id: 'verificationStatus',
    header: () => <ColumnHeader label="Pt Verification" />,
    cell: ({ row: { original: patient } }) => (
      <StatusIcon status={patient?.verificationStatus} />
    ),
    size: 50,
  },
  {
    id: 'contact',
    header: () => <ColumnHeader label="Contact Initiated" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell className="truncate">{patient?.contactMadeStatus}</TextCell>
    ),
  },
  {
    id: 'updated-at',
    header: () => <ColumnHeader label="Updated Date/Time" />,
    cell: ({ row }) => <UpdatedDateTimeCell row={row} />,
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
