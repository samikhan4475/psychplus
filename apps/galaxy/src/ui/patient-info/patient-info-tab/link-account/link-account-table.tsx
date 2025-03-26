import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { PatientLink } from '@/types'
import { ActionsCell, StatusCell } from './cells'

interface LinkAccountListingTableProps {
  linkAccountListing: PatientLink[]
  refetchList: () => void
}

const columns = (refetchList: () => void): ColumnDef<PatientLink>[] => {
  return [
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
      id: 'link-account-actions',
      header: () => <ColumnHeader label="Action" />,
      cell: ({ row }) => <ActionsCell row={row} refetchList={refetchList} />,
    },
  ]
}

const LinkAccountListingTable = ({
  linkAccountListing,
  refetchList,
}: LinkAccountListingTableProps) => {
  return (
    <ScrollArea scrollbars="vertical" className="max-h-52 p-2">
      <DataTable
        data={linkAccountListing ?? []}
        columns={columns(refetchList)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { LinkAccountListingTable }
