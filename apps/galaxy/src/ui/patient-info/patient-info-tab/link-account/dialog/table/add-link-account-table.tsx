import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { AddLinkAccountListResponse } from '@/types'
import { ActionsCell } from './action-cell'

const columns: ColumnDef<AddLinkAccountListResponse>[] = [
  {
    id: 'name',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row }) => <TextCell>{row.original?.name?.firstName}</TextCell>,
    size: 50,
  },
  {
    id: 'age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row }) => <TextCell>{row.original?.name?.middleName}</TextCell>,
    size: 100,
  },
  {
    id: 'gender',
    header: () => <ColumnHeader label="Gender" />,
    cell: ({ row }) => <TextCell>{row.original?.name?.lastName}</TextCell>,
  },

  {
    id: 'patient-status',
    header: () => <ColumnHeader label="Patient Status" />,
    cell: ({ row }) => <TextCell>{row.original?.patientstatus}</TextCell>,
  },
  {
    id: 'p-c',
    header: () => <ColumnHeader label="P&C" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.contactDetails?.email}</TextCell>
    ),
  },
  {
    id: 'cc',
    header: () => <ColumnHeader label="CC" />,
    cell: ({ row }) => <TextCell>{row?.original?.cc}</TextCell>,
  },
  {
    id: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row }) => <TextCell>{row.original?.mrn}</TextCell>,
  },
  {
    id: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row }) => <TextCell>{row.original?.dob}</TextCell>,
  },
  {
    id: 'phonenumber',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row }) => <TextCell>{row.original?.phone}</TextCell>,
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row }) => <TextCell>{row.original?.email}</TextCell>,
  },
  {
    id: 'city',
    header: () => <ColumnHeader label="City" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.contactDetails?.city}</TextCell>
    ),
  },
  {
    id: 'zipcode',
    header: () => <ColumnHeader label="Zip" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.contactDetails?.zipcode}</TextCell>
    ),
  },
  {
    id: 'insurance',
    header: () => <ColumnHeader label="Insurance (primary)" />,
    cell: ({ row }) => <TextCell>{row.original?.insurance}</TextCell>,
  },
  {
    id: 'user',
    header: () => <ColumnHeader label="User Created" />,
    cell: ({ row }) => <TextCell>{row.original?.user}</TextCell>,
  },
  {
    id: 'next-visit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row }) => <TextCell>{row.original?.visit}</TextCell>,
  },
  {
    id: 'link-account-actions',
    header: () => <ColumnHeader label="Action" />,
    cell: ActionsCell,
  },
]

const AddLinkAccountTable = () => {
  return (
    <ScrollArea scrollbars="vertical" className="max-h-52 p-2">
      <DataTable data={[]} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { AddLinkAccountTable }
