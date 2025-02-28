import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { ClaimNotesResponse, Sort } from '@/types'
import { formatDate } from '@/utils'
import { ClaimNotesCell } from '../claim-notes-table/notes-cell'
import { ClaimDeletedNotesRowAction } from './action-cell'
import { ClaimNotesAlertCell } from './alert-cell'

const columns = (sort?: Sort): ColumnDef<ClaimNotesResponse>[] => {
  return [
    {
      id: 'note',
      accessorKey: 'note',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Note"
        />
      ),
      cell: ({ row }) => <ClaimNotesCell row={row} />,
      enableHiding: true,
    },

    {
      id: 'effectiveDateFrom',
      accessorKey: 'effectiveDateFrom',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Effective Date From"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{formatDate(row.original.effectiveDateFrom)}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'effectiveDateTo',
      accessorKey: 'effectiveDateTo',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Effective Date To"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{formatDate(row.original.effectiveDateTo)}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'createdDate',
      accessorKey: 'createdDate',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Created Date"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{formatDate(row.original.metadata?.createdOn)}</TextCell>
      ),

      enableHiding: true,
    },
    {
      id: 'createdBy',
      accessorKey: 'createdBy',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Created By"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.metadata?.createdByFullName}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'alert',
      accessorKey: 'alert',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Alert"
        />
      ),
      cell: ({ row }) => <ClaimNotesAlertCell row={row} />,

      enableHiding: true,
    },
    {
      id: 'actions-column',
      accessorKey: 'actions-column',
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => <ClaimDeletedNotesRowAction row={row} />,
      enableHiding: false,
    },
  ]
}

export { columns }
