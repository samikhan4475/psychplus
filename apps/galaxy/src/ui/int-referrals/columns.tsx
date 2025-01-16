'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { PatientReferral } from '@/types'
import { formatDate, formatDateTime, getPatientFullName } from '@/utils'
import {
  GenderLabelCell,
  ServiceNameCell,
} from '../referrals/patient-referrals-widget/cells'
import {
  ActionCell,
  CollapseCell,
  ContactMadeSelectCell,
  ReferralStatusCell,
} from './cells'
import { getPrimaryInsuranceName, getSecondaryInsuranceName } from './utils'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'referral-history',
    header: () => <ColumnHeader label="Hx" />,
    cell: CollapseCell,
    size: 20,
  },
  {
    id: 'ptname',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original } }) => {
      return (
        <LongTextCell className="min-w-24">
          {original?.patientName && getPatientFullName(original?.patientName)}
        </LongTextCell>
      )
    },
  },
  {
    id: 'pt-status',
    header: () => <ColumnHeader label="User Status" />,
    cell: GenderLabelCell,
  },
  {
    id: 'age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.patientAge}</TextCell>
    ),
  },
  {
    id: 'patient-gender',
    header: () => <ColumnHeader label="Gender" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.patientGender}</TextCell>
    ),
  },
  {
    id: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.patientMrn}</TextCell>
    ),
  },
  {
    id: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.patientDateOfBirth &&
          formatDate(original?.patientDateOfBirth, 'dd/MM/yyyy')}
      </TextCell>
    ),
  },
  {
    id: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.contactDetails?.phoneNumbers?.[0]?.number ?? ''}
      </TextCell>
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
    id: 'state',
    header: () => <ColumnHeader label="State" />,
    cell: ({ row: { original } }) => <TextCell>{original?.stateCode}</TextCell>,
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
  {
    id: 'primaryInsurance',
    header: () => <ColumnHeader label="Primary Insurance" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getPrimaryInsuranceName(original.paitentInsurancePolicies)}
      </TextCell>
    ),
  },
  {
    id: 'secondaryInsurance',
    header: () => <ColumnHeader label="Secondary Insurance" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getSecondaryInsuranceName(original.paitentInsurancePolicies)}
      </TextCell>
    ),
  },
  {
    id: 'service',
    header: () => <ColumnHeader label="Service" />,
    cell: ServiceNameCell,
  },
  {
    id: 'order-date-time',
    header: () => <ColumnHeader label="Order date/time" />,
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
        {referral?.referralDate &&
          formatDateTime(referral?.referralDate, false)}
      </TextCell>
    ),
  },

  {
    id: 'visitID',
    header: () => <ColumnHeader label="Visit ID" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.appointmentId}</TextCell>
    ),
  },
  {
    id: 'service-status',
    header: () => <ColumnHeader label="Service Priority Status" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
        {original?.servicesStatus}
      </TextCell>
    ),
  },
  {
    id: 'initiated-by',
    header: () => <ColumnHeader label="Initiated By" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
        {original?.intiatedByUserRole}
      </TextCell>
    ),
  },
  {
    id: 'provider',
    header: () => <ColumnHeader label="Provider" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.referredByName &&
          getPatientFullName(original?.referredByName)}
      </TextCell>
    ),
  },

  {
    id: 'contact-made',
    header: () => <ColumnHeader label="Contact Made" />,
    cell: ContactMadeSelectCell,
  },
  {
    id: 'referral-status',
    header: () => <ColumnHeader label="Referral Status" />,
    cell: ReferralStatusCell,
  },

  {
    id: 'next-visit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
        {formatDate(original?.nextVisit, 'dd/MM/yyyy') ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'visit-hx',
    header: () => <ColumnHeader label="Visit Hx" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate" wrapperClass="bg-gray-3 w-full">
        {formatDate(original?.patientVisitHistory, 'dd/MM/yyyy') ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'comments',
    header: () => <ColumnHeader label="Comments" />,
    size: 40,
    cell: ({ row: { original } }) => (
      <LongTextCell className="max-w-32">{original.comments}</LongTextCell>
    ),
  },

  {
    id: 'action',
    header: () => <ColumnHeader label="Action" />,
    cell: ActionCell,
  },
]

export { columns }
