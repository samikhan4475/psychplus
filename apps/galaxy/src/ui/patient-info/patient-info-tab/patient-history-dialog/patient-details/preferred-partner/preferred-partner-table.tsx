'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { PatientPreferredPartner } from '../../../types'

const columns: ColumnDef<PatientPreferredPartner>[] = [
  {
    id: 'id',
    header: () => <ColumnHeader label="PP ID" />,
    cell: ({ row }) => <TextCell>{row.original.id}</TextCell>,
  },
  {
    id: 'name',
    size: 300,
    header: () => <ColumnHeader label="PP name" />,
    cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
  },
  {
    id: 'premiumStatus',
    header: () => <ColumnHeader label="PP Premium Status" />,
    cell: ({ row }) => <TextCell>{row.original.premiumStatus}</TextCell>,
  },
  {
    id: 'payerStatus',
    header: () => <ColumnHeader label="PP Payer Status" />,
    cell: ({ row }) => <TextCell>{row.original.payerStatus}</TextCell>,
  },
  {
    id: 'userID',
    header: () => <ColumnHeader label="PP User ID" />,
    cell: ({ row }) => <TextCell>{row.original.userID}</TextCell>,
  },
  {
    id: 'userType',
    header: () => <ColumnHeader label="PP User Type" />,
    cell: ({ row }) => <TextCell>{row.original.userType}</TextCell>,
  },
  {
    id: 'usersInID',
    header: () => <ColumnHeader label="Users in ID" />,
    cell: ({ row }) => <TextCell>{row.original.usersInID}</TextCell>,
  },
  {
    id: 'userStatus',
    header: () => <ColumnHeader label="PP User Status" />,
    cell: ({ row }) => <TextCell>{row.original.userStatus}</TextCell>,
  },
  {
    id: 'startDate',
    header: () => <ColumnHeader label="Start Date" />,
    cell: ({ row }) => <TextCell>{row.original.startDate}</TextCell>,
  },
  {
    id: 'endDate',
    header: () => <ColumnHeader label="End Date" />,
    cell: ({ row }) => <TextCell>{row.original.endDate}</TextCell>,
  },
  {
    id: 'priority',
    header: () => <ColumnHeader label="Priority" />,
    cell: ({ row }) => <TextCell>{row?.original?.priority}</TextCell>,
  },
]

const PreferredPartnerTable = () => {
  return (
    <ScrollArea className="max-h-28">
      <DataTable data={data} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

const data: PatientPreferredPartner[] = [...Array(14)].map((_, key) => ({
  startDate: '12/11/23',
  endDate: '12/11/23',
  id: 'AB' + key,
  isPrimaryPartner: key % 2 === 0,
  name: 'Aehtena Health',
  payerStatus: 'Insurance',
  premiumStatus: 'Basic',
  priority: key % 2 === 0 ? 'Primary' : 'Secondary',
  userID: '1234',
  usersInID: '12',
  userStatus: 'Primary',
  userType: 'Family',
}))
export { PreferredPartnerTable }
