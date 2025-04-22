'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { PatientReferral as Referral } from '@/types'
import {
  ContactMadeSelectCell,
  ServiceNameCell,
} from '@/ui/referrals/patient-referrals-widget/cells'
import {
  formatDateTime,
  getPatientFullName,
  getSlashedPaddedDateString,
} from '@/utils'

export interface ReferralTableProps {
  referrals: Referral[]
}

const referralsColumns: ColumnDef<Referral>[] = [
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
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service" />
    ),
    cell: ServiceNameCell,
  },
  {
    id: 'service status',
    accessorKey: 'servicesStatus',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="Service Priority Status"
      />
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
      <ColumnHeader column={column} clientSideSort label="Referring Provider" />
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
      <ColumnHeader
        column={column}
        clientSideSort
        label="Contact Initiated Status"
      />
    ),
    cell: ContactMadeSelectCell,
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
]

const ReferralTable = ({ referrals }: ReferralTableProps) => {
  return (
    <Box>
      <ScrollArea className="max-h-[49vh] pb-2">
        <DataTable
          columns={referralsColumns}
          data={referrals ?? []}
          theadClass="bg-indigo-3 z-10"
        />
      </ScrollArea>
    </Box>
  )
}

export { ReferralTable }
