'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { ActionCell, CollapseCell, ContactMadeSelectCell } from './cells'
import { StatusIcon } from './status-icon'
import { Patient } from './types'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'hx',
    header: () => <ColumnHeader label="Hx" />,
    cell: CollapseCell,
    maxSize: 50,
  },
  {
    id: 'name',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">{original?.name}</LongTextCell>
    ),
  },
  {
    id: 'pt-status',
    header: () => <ColumnHeader label="Pt Status" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.status}</TextCell>
    ),
  },
  {
    id: 'age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row: { original } }) => <TextCell>{original?.age}</TextCell>,
  },
  {
    id: 'patient-gender',
    header: () => <ColumnHeader label="Gen." />,
    cell: ({ row: { original } }) => <TextCell>{original?.gender}</TextCell>,
  },
  {
    id: 'verify',
    header: ({ column }) => <ColumnHeader column={column} label="Verify" />,
    columns: [
      {
        id: 'verificationStatus',
        header: () => <ColumnHeader label="P" />,
        cell: ({ row: { original: patient } }) => (
          <StatusIcon status={patient?.verificationStatus} />
        ),
      },
      {
        id: 'patientVerificationTimeElapsed',
        header: () => <ColumnHeader label="P-Elapsed" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient?.patientVerificationTimeElapsed}
          </TextCell>
        ),
      },
      {
        id: 'insuranceVerification',
        header: () => <ColumnHeader label="I" />,
        cell: ({ row: { original: patient } }) => (
          <StatusIcon status={patient?.insuranceVerification} />
        ),
      },
      {
        id: 'insuranceVerificationTimeElapsed',
        header: () => <ColumnHeader label="I-Elapsed" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient?.insuranceVerificationTimeElapsed}
          </TextCell>
        ),
      },
      {
        id: 'p-&-c',
        header: () => <ColumnHeader label="P&C" />,
        cell: ({ row: { original: patient } }) => (
          <StatusIcon status={patient?.patientConsent} />
        ),
      },
      {
        id: 'cc',
        header: () => <ColumnHeader label="CC" />,
        cell: ({ row: { original: patient } }) => (
          <StatusIcon status={patient?.ccVerification} />
        ),
      },
    ],
  },
  {
    id: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.mrn}</TextCell>
    ),
  },
  {
    id: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.dob}</TextCell>
    ),
  },
  {
    id: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.phoneNumber}</TextCell>
    ),
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.contactDetails?.email}
      </TextCell>
    ),
  },
  {
    id: 'ss',
    header: () => <ColumnHeader label="SS" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.socialSecurityNumber}</TextCell>
    ),
  },
  {
    id: 'residence',
    header: () => <ColumnHeader label="Residence (State)" />,
    cell: ({ row: { original } }) => <TextCell>{original?.residence}</TextCell>,
  },
  {
    id: 'city',
    header: () => <ColumnHeader label="City" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.city}</TextCell>
    ),
  },
  {
    id: 'zip',
    header: () => <ColumnHeader label="Zip" />,
    cell: ({ row: { original } }) => <TextCell>{original?.zip}</TextCell>,
  },
  //Todo in phase 2
  // {
  //   id: 'practice',
  //   header: () => <ColumnHeader label="Practice" />,
  //   cell: ({ row }) => <PracticeSelectCell row={row} />,
  // },
  {
    id: 'insurance',
    header: () => <ColumnHeader label="Insurance" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.insurance}</TextCell>
    ),
  },
  {
    id: 'user-created',
    header: () => <ColumnHeader label="User Created" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.userCreated}</TextCell>
    ),
  },
  {
    id: 'created-by',
    header: () => <ColumnHeader label="Created By" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {original.metadata?.createdByFullName}
      </LongTextCell>
    ),
  },
  {
    id: 'next-visit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.upcomingAppointmentDate}
      </TextCell>
    ),
  },
  {
    id: 'visit-hx',
    header: () => <ColumnHeader label="Visit Hx" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.mostRecentAppointmentDate}
      </TextCell>
    ),
  },
  {
    id: 'contact-made',
    header: () => <ColumnHeader label="Contact Made" />,
    cell: ContactMadeSelectCell,
  },
  {
    id: 'action',
    header: () => <ColumnHeader label="Action" />,
    cell: ActionCell,
  },
]

export { columns }
