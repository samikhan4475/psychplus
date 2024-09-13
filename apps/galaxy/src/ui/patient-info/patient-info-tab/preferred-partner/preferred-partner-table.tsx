'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { PatientPreferredPartner } from '../types'
import { PrioritySelectCell } from './cells'

const columns: ColumnDef<PatientPreferredPartner>[] = [
  {
    id: 'id',
    header: () => (
      <ColumnHeader
        label="PP ID"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.id}</TextCell>,
  },
  {
    id: 'name',
    header: () => (
      <ColumnHeader
        label="PP name"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
  },
  {
    id: 'premiumStatus',
    header: () => (
      <ColumnHeader
        label="PP Premium Status"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.premiumStatus}</TextCell>,
  },
  {
    id: 'payerStatus',
    header: () => (
      <ColumnHeader
        label="PP Payer Status"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.payerStatus}</TextCell>,
  },
  {
    id: 'userID',
    header: () => (
      <ColumnHeader
        label="PP User ID"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.userID}</TextCell>,
  },
  {
    id: 'userType',
    header: () => (
      <ColumnHeader
        label="PP User Type"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.userType}</TextCell>,
  },
  {
    id: 'usersInID',
    header: () => (
      <ColumnHeader
        label="Users in ID"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.usersInID}</TextCell>,
  },
  {
    id: 'userStatus',
    header: () => (
      <ColumnHeader
        label="PP User Status"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.userStatus}</TextCell>,
  },
  {
    id: 'startDate',
    header: () => (
      <ColumnHeader
        label="Start Date"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.startDate}</TextCell>,
  },
  {
    id: 'endDate',
    header: () => (
      <ColumnHeader
        label="End Date"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.endDate}</TextCell>,
  },
  {
    id: 'priority',
    header: () => (
      <ColumnHeader
        label="Priority"
        className="!text-black !pl-0.5 !text-1 !font-regular"
      />
    ),
    cell: PrioritySelectCell,
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
