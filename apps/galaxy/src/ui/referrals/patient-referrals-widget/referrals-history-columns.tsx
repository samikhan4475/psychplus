'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { PatientReferral } from '@/types'
import { formatDateTime, getPatientFullName } from '@/utils'
import { ContactMadeSelectCell, ReferralStatusCell } from './cells'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'referral date',
    accessorKey: 'referralDate',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">
        {referral?.referralDate && formatDateTime(referral?.referralDate)}
      </TextCell>
    ),
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell>{referral?.service}</TextCell>
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
    id: 'created by',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Initiated By" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">
        {referral?.metadata?.createdByFullName}
      </TextCell>
    ),
  },
  {
    id: 'referring provider',
    accessorKey: 'referringProvider',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Referring Provider" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell>
        {referral?.referredByName &&
          getPatientFullName(referral?.referredByName)}
      </TextCell>
    ),
  },
  {
    id: 'contact status',
    accessorKey: 'contactStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Contact" />
    ),
    cell: ({ row }) => <ContactMadeSelectCell row={row} disabled />,
  },
  {
    id: 'visit date',
    accessorKey: 'visitDateTime',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Visit Date" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell>
        {referral?.visitDateTime
          ? formatDateTime(referral?.visitDateTime)
          : 'N/A'}
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
    id: 'comments',
    accessorKey: 'comments',
    header: () => <ColumnHeader label="Comments" />,
    cell: ({ row: { original: referral } }) => (
      <LongTextCell>{referral?.comments}</LongTextCell>
    ),
  },
]

export { columns }
