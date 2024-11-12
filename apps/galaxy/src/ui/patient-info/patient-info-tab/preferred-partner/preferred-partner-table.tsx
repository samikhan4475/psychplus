'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { PatientPreferredPartner } from '@/types'
import { getSlashedPaddedDateString } from '@/utils'

const columns: ColumnDef<PatientPreferredPartner>[] = [
  {
    id: 'id',
    header: () => <ColumnHeader label="PP ID" />,
    cell: ({ row }) => <LongTextCell>{row?.original?.id}</LongTextCell>,
  },
  {
    id: 'name',
    header: () => <ColumnHeader label="PP name" />,
    cell: ({ row }) => <TextCell>{row?.original?.name}</TextCell>,
  },
  {
    id: 'premiumStatus',
    header: () => <ColumnHeader label="PP Premium Status" />,
    cell: ({ row }) => <TextCell>{row?.original?.subscriptionStatus}</TextCell>,
  },
  {
    id: 'payerStatus',
    header: () => <ColumnHeader label="PP Payer Status" />,
    cell: ({ row }) => <TextCell>{row?.original?.payerStatus}</TextCell>,
  },
  {
    id: 'userID',
    header: () => <ColumnHeader label="PP User ID" />,
    cell: ({ row }) => <TextCell>{row?.original?.userID}</TextCell>,
  },
  {
    id: 'userType',
    header: () => <ColumnHeader label="PP User Type" />,
    cell: ({ row }) => <TextCell>{row?.original?.userType}</TextCell>,
  },
  {
    id: 'usersInID',
    header: () => <ColumnHeader label="Users in ID" />,
    cell: ({ row }) => <TextCell>{row?.original?.totalIds}</TextCell>,
  },
  {
    id: 'userStatus',
    header: () => <ColumnHeader label="PP User Status" />,
    cell: ({ row }) => <TextCell>{row?.original?.userStatus}</TextCell>,
  },
  {
    id: 'startDate',
    header: () => <ColumnHeader label="Start Date" />,
    cell: ({ row }) => (
      <TextCell>{getSlashedPaddedDateString(row?.original?.addDate)}</TextCell>
    ),
  },
  {
    id: 'endDate',
    header: () => <ColumnHeader label="End Date" />,
    cell: ({ row }) => (
      <TextCell>{getSlashedPaddedDateString(row?.original?.termDate)}</TextCell>
    ),
  },
]

interface PreferredPartnerTable {
  preferredPartners: PatientPreferredPartner[]
}

const PreferredPartnerTable = ({
  preferredPartners,
}: PreferredPartnerTable) => {
  return (
    <ScrollArea className="max-h-28">
      <DataTable
        data={preferredPartners}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PreferredPartnerTable }
