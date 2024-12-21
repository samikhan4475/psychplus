'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PatientReferral } from '@/types'
import { formatDate, formatDateTime, getPatientFullName } from '@/utils'
import { ReferralStatusCell, ServiceNameCell } from './cells'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service" />
    ),
    cell: ({ row }) => <ServiceNameCell row={row} />,
  },
  {
    id: 'referral date',
    accessorKey: 'referralDate',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service Date/Time" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">
        {referral?.referralDate && formatDateTime(referral?.referralDate)}
      </TextCell>
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
    id: 'initiated by',
    accessorKey: 'intiatedByUserRole',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Initiated By" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">{referral?.intiatedByUserRole}</TextCell>
    ),
  },
  {
    accessorKey: 'nextVisit',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Next Visit" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {formatDate(original?.nextVisit) ?? 'N/A'}
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
        {formatDate(original?.patientVisitHistory) ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'ordering provider',
    accessorKey: 'referral.referredByName.firstName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Ordering Provider" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell>
        {referral?.referredByName &&
          getPatientFullName(referral?.referredByName)}
      </TextCell>
    ),
  },
  {
    id: 'referral status',
    accessorKey: 'resourceStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Referral Status" />
    ),
    cell: ({ row }) => <ReferralStatusCell row={row} disabled />,
  },
  {
    id: 'updated-at',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Updated At" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">
        {formatDateTime(referral?.metadata?.createdOn)}
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
      <TextCell className="truncate">
        {referral?.metadata?.createdByFullName}
      </TextCell>
    ),
  },
]

export { columns }
