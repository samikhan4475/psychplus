import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { LinkAccountTable } from '@/types'
import { ActionsCell } from './cells'

interface LinkAccountListingTableProps {
  linkAccountListing: LinkAccountTable[]
}

const columns: ColumnDef<LinkAccountTable>[] = [
  {
    id: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row }) => <TextCell>{row.original?.mrn}</TextCell>,
    size: 50,
  },
  {
    id: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row }) => <TextCell>{row.original?.phone}</TextCell>,
    size: 100,
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row }) => <TextCell>{row.original?.email}</TextCell>,
  },

  {
    id: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => <TextCell>{row.original?.status}</TextCell>,
  },

  {
    id: 'primary-account',
    header: () => <ColumnHeader label="Primary account" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.scheduleMessagingOrders}</TextCell>
    ),
  },
  {
    id: 'sign-in',
    header: () => <ColumnHeader label="Sign in" />,
    cell: ({ row }) => <TextCell>{row.original?.signIn}</TextCell>,
  },
  {
    id: 'link-account-actions',
    header: () => <ColumnHeader label="Action" />,
    cell: ActionsCell,
  },
]

const LinkAccountListingTable = ({
  linkAccountListing,
}: LinkAccountListingTableProps) => {
  return (
    <ScrollArea scrollbars="vertical" className="max-h-52 p-2">
      <DataTable
        data={linkAccountListing ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { LinkAccountListingTable }
