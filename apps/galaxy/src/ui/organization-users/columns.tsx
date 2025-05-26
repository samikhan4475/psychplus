'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { Gender } from '@/types'
import {
  getMaskedPhoneNumber,
  getPatientAge,
  getPatientCity,
  getPatientDOB,
  getPatientFullName,
  getPatientGender,
  getPatientInsuranceName,
  getPatientMRN,
  getPatientPhone,
  getPatientPostalCode,
  getPatientState,
  getPatientZipLast4,
  getSlashedPaddedDateString,
} from '@/utils'
import {
  CollapseCell,
  ContactMadeSelectCell,
  PracticeSelectCell,
} from './cells'
import { RowActionDelete } from './row-action-delete'
import { Users } from './types'

const columns: ColumnDef<Users>[] = [
  {
    id: 'hx',
    header: () => <ColumnHeader label="HX" />,
    cell: CollapseCell,
    maxSize: 50,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Name"
        className="!text-black justify-center text-center align-middle !font-medium"
      />
    ),
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {getPatientFullName(original.legalName)}
      </TextCell>
    ),
  },
  {
    id: 'ptStatus',
    accessorKey: 'ptStatus',
    header: ({ column }) => <ColumnHeader column={column} label="Pt Status" />,
    cell: ({ row }) => <TextCell>{row.original?.status}</TextCell>,
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: ({ column }) => <ColumnHeader column={column} label="Age" />,
    cell: ({ row }) => (
      <TextCell>{getPatientAge(row.original?.birthdate)}</TextCell>
    ),
    maxSize: 50,
  },
  {
    id: 'gen',
    accessorKey: 'gen',
    header: ({ column }) => <ColumnHeader column={column} label="Gen." />,
    cell: ({ row: { original } }) => (
      <TextCell>{getPatientGender(original.gender as Gender)}</TextCell>
    ),
    maxSize: 50,
  },
  {
    id: 'verify',
    header: ({ column }) => <ColumnHeader column={column} label="Verify" />,
    columns: [
      {
        id: 'verificationStatus',
        header: () => <ColumnHeader label="P" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell>{patient?.verificationStatus}</TextCell>
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
        size: 50,
        header: ({ column }) => <ColumnHeader label="I" column={column} />,
        cell: ({ row: { original: patient } }) => (
          <TextCell>{patient?.insuranceVerification}</TextCell>
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
          <TextCell>{patient?.patientConsent}</TextCell>
        ),
      },
      {
        id: 'cc',
        header: ({ column }) => <ColumnHeader label="CC" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell>
            {patient?.creditCardVerificationStatus === 'Active' ? 'Yes' : 'No'}
          </TextCell>
        ),
      },
    ],
  },
  {
    id: 'mrn',
    accessorKey: 'mrn',
    header: ({ column }) => <ColumnHeader column={column} label="MRN" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{getPatientMRN(original?.id)}</TextCell>
    ),
  },
  {
    id: 'dob',
    accessorKey: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {getPatientDOB(original?.birthdate)}
      </TextCell>
    ),
  },
  {
    id: 'phone',
    accessorKey: 'phoneNumber',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {getMaskedPhoneNumber(
          getPatientPhone(original?.contactDetails?.phoneNumbers) ?? '',
        )}
      </TextCell>
    ),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.contactDetails?.email}
      </TextCell>
    ),
  },
  {
    id: 'ss',
    accessorKey: 'socialSecurityNumber',
    header: () => <ColumnHeader label="SS" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.socialSecurityNumber}</TextCell>
    ),
  },
  {
    id: 'residenceState',
    accessorKey: 'residenceState',
    header: () => <ColumnHeader label="Residence (State)" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getPatientState(original?.contactDetails?.addresses)}
      </TextCell>
    ),
  },
  {
    id: 'city',
    accessorKey: 'city',
    header: () => <ColumnHeader label="City" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {getPatientCity(original?.contactDetails?.addresses)}
      </TextCell>
    ),
  },
  {
    id: 'zip',
    accessorKey: 'zip',
    header: () => <ColumnHeader label="Zip" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getPatientPostalCode(original?.contactDetails?.addresses)}
      </TextCell>
    ),
  },
  {
    id: 'areaCode',
    accessorKey: 'zipLast4',
    header: () => <ColumnHeader label="Area Code" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getPatientZipLast4(original?.contactDetails?.addresses)}
      </TextCell>
    ),
  },
  {
    id: 'hasGuardian',
    accessorKey: 'hasGuardian',
    header: () => <ColumnHeader label="Guardian" />,
    cell: ({ row: { original: patient } }) => (
      <TextCell>{patient?.hasGuardian ? 'Yes' : 'No'}</TextCell>
    ),
  },
  // Need this from BE
  {
    id: 'organization',
    accessorKey: 'organization',
    header: () => <ColumnHeader label="Organization" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.organization || 'N/A'}</TextCell>
    ),
  },
  // Need this from BE
  {
    id: 'practice',
    accessorKey: 'practice',
    header: () => <ColumnHeader label="Practice" />,
    cell: ({ row }) => <PracticeSelectCell row={row} />,
  },
  {
    id: 'insurance',
    accessorKey: 'insurance',
    header: () => <ColumnHeader label="Insurance" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {getPatientInsuranceName(original?.insurancePolicies)}
      </TextCell>
    ),
  },
  {
    id: 'userCreated',
    accessorKey: 'userCreated',
    header: () => <ColumnHeader label="User Created" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getSlashedPaddedDateString(original?.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'createdBy',
    accessorKey: 'createdBy',
    header: () => <ColumnHeader label="Created By" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {original.metadata?.createdByFullName}
      </LongTextCell>
    ),
  },
  {
    id: 'nextVisit',
    accessorKey: 'nextVisit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.upcomingAppointmentDate
          ? getSlashedPaddedDateString(original.upcomingAppointmentDate)
          : 'None'}
      </TextCell>
    ),
  },
  {
    id: 'visitHx',
    accessorKey: 'visitHx',
    header: () => <ColumnHeader label="Visit Hx" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.mostRecentAppointmentDate
          ? getSlashedPaddedDateString(original.mostRecentAppointmentDate)
          : 'None'}
      </TextCell>
    ),
  },
  // TODO: after action make onchange func
  {
    id: 'contactInitiated',
    accessorKey: 'contactInitiated',
    header: () => <ColumnHeader label="Contact Initiated" />,
    cell: ({ row }) => <ContactMadeSelectCell row={row} />,
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="Action" />,
    cell: ({ row }) => <RowActionDelete row={row} />,
    size: 50,
  },
]

export { columns }
