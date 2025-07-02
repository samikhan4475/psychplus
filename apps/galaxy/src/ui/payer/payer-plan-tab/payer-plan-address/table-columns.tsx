import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PayerPlanAddressResponse } from '@/types/payer'
import { ActionsCell } from './table-action-cell'
import { TableCellStatus } from './table-column-status'

const columns = (payerId: string): ColumnDef<PayerPlanAddressResponse>[] => {
  return [
    {
      id: 'address1',
      header: () => <ColumnHeader label="Address 1" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.address?.street1 ?? ''}</TextCell>
      ),
    },
    {
      id: 'address2',
      header: () => <ColumnHeader label="Address 2" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.address?.street2 ?? ''}</TextCell>
      ),
    },
    {
      id: 'city',
      header: () => <ColumnHeader label="City" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.address?.city ?? ''}</TextCell>
      ),
    },

    {
      id: 'state',
      header: () => <ColumnHeader label="State" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.address?.state ?? ''}</TextCell>
      ),
    },
    {
      id: 'status',
      header: () => <ColumnHeader label="Status" />,
      cell: ({ row }) => <TableCellStatus row={row} />,
    },
    {
      id: 'zip',
      header: () => <ColumnHeader label="Zip" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.address?.postalCode}</TextCell>
      ),
    },
    {
      id: 'address.postalPlus4Code',
      header: () => <ColumnHeader label="Postal+4" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.address?.postalPlus4Code ?? ''}</TextCell>
      ),
    },
    {
      id: 'isDefaultLocation',
      header: () => <ColumnHeader label="Default Address" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.isDefaultLocation ? 'Yes' : 'No'}</TextCell>
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} payerId={payerId} />,
    },
  ]
}

export { columns }
