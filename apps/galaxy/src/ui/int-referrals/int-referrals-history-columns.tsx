'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { PatientReferral } from '@/types'
import { formatDate, formatDateTime, getPatientFullName } from '@/utils'
import { ServiceNameCell } from '../referrals/patient-referrals-widget/cells'
import {
  ContactMadeSelectCell,
  ReferralStatusCell,
  ServiceStatusSelectCell,
} from './cells'
import { getPrimaryInsuranceName, getSecondaryInsuranceName } from './utils'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'ptname',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original } }) => {
      return (
        <LongTextCell className="min-w-20">
          {original?.patientName && getPatientFullName(original?.patientName)}
        </LongTextCell>
      )
    },
  },
  {
    id: 'primaryInsurance',
    header: () => <ColumnHeader label="Primary Insurance" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {getPrimaryInsuranceName(original.patientInsurancePolicies)}
      </TextCell>
    ),
  },
  {
    id: 'secondaryInsurance',
    header: () => <ColumnHeader label="Secondary Insurance" />,
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {getSecondaryInsuranceName(original.patientInsurancePolicies)}
      </LongTextCell>
    ),
  },
  {
    id: 'service',
    header: () => <ColumnHeader label="Service" />,
    cell: ServiceNameCell,
  },
  {
    id: 'service-date-time',
    header: () => <ColumnHeader label="Order date/time" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.referralDate && formatDateTime(original?.referralDate)}
      </TextCell>
    ),
  },
  {
    id: 'service-status',
    header: () => <ColumnHeader label="Service Priority Status" />,
    cell: ({ row }) => <ServiceStatusSelectCell row={row} disabled />,
  },
  {
    id: 'initiated-by',
    header: () => <ColumnHeader label="Initiated By" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.metadata?.createdByFullName}
      </TextCell>
    ),
  },
  {
    id: 'next-visit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {formatDate(original?.nextVisit, 'dd-MM-yyyy') ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'visit-hx',
    header: () => <ColumnHeader label="Visit Hx" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {formatDate(original?.patientVisitHistory, 'dd-MM-yyyy') ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'ordering provider',
    accessorKey: 'referral.referredByName.firstName',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Ordering Provider" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell>
        {referral?.referredByName &&
          getPatientFullName(referral?.referredByName)}
      </TextCell>
    ),
  },
  {
    id: 'contact-made',
    header: () => <ColumnHeader label="Contact Made" />,
    cell: ({ row }) => <ContactMadeSelectCell row={row} disabled />,
  },
  {
    id: 'referral-status',
    header: () => <ColumnHeader label="Referral Status" />,
    cell: ({ row }) => <ReferralStatusCell row={row} disabled />,
  },
  {
    id: 'comments',
    header: () => <ColumnHeader label="Comments" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">{original.comments}</LongTextCell>
    ),
  },
  {
    id: 'updated-at',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Updated At" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">
        {referral?.metadata?.createdOn
          ? formatDateTime(referral?.metadata?.createdOn)
          : 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'updated-by',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Updated By" />
    ),
    cell: ({ row: { original: referral } }) => (
      <LongTextCell>{referral?.metadata?.createdByFullName}</LongTextCell>
    ),
  },
]

export { columns }
