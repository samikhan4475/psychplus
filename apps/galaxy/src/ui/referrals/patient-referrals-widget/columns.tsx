'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { PatientReferral } from '@/types'
import {
  formatDateTime,
  getPatientFullName,
  getSlashedPaddedDateString,
} from '@/utils'
import {
  ActionCell,
  CollapseCell,
  ContactMadeSelectCell,
  ReferralStatusCell,
  ServiceNameCell,
} from './cells'

const columns = (isTabView = false): ColumnDef<PatientReferral>[] => [
  {
    id: 'referral-history',
    header: () => <ColumnHeader label="Hx" />,
    cell: CollapseCell,
    size: 20,
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service" />
    ),
    cell: ServiceNameCell,
  },
  {
    id: 'referral date',
    accessorKey: 'referralDate',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Order Date/Time" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">
        {referral?.referralDate
          ? formatDateTime(referral?.referralDate)
          : 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'appointmentId',
    accessorKey: 'appointmentId',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Visit ID" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">{referral?.appointmentId}</TextCell>
    ),
  },
  {
    id: 'service status',
    accessorKey: 'servicesStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service Status" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell>{referral?.servicesStatus}</TextCell>
    ),
  },
  {
    id: 'intiatedByUserRole',
    accessorKey: 'intiatedByUserRole',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Initiated By" />
    ),
    cell: ({ row: { original: referral } }) => (
      <LongTextCell>{referral?.intiatedByUserRole}</LongTextCell>
    ),
  },
  {
    id: 'provider',
    accessorKey: 'referral.referredByName.firstName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Provider" />
    ),
    cell: ({ row: { original: referral } }) => (
      <LongTextCell>
        {referral?.referredByName &&
          getPatientFullName(referral?.referredByName)}
      </LongTextCell>
    ),
  },
  {
    id: 'contact status',
    accessorKey: 'contactStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Contact Made" />
    ),
    cell: ContactMadeSelectCell,
  },
  {
    id: 'referral status',
    accessorKey: 'resourceStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Referral Status" />
    ),
    cell: ReferralStatusCell,
  },
  {
    accessorKey: 'nextVisit',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Next Visit" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.nextVisit
          ? getSlashedPaddedDateString(original?.nextVisit)
          : 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'visit-hx',
    accessorKey: 'patientVisitHistory',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Visit Hx" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.patientVisitHistory
          ? getSlashedPaddedDateString(original?.patientVisitHistory)
          : 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'comments',
    accessorKey: 'comments',
    header: () => <ColumnHeader label="Comments" />,
    cell: ({ row: { original: referral } }) => (
      <LongTextCell>{referral?.comments}</LongTextCell>
    ),
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionCell row={row} isTabView={isTabView} />,
    size: 50,
  },
]
export { columns }
