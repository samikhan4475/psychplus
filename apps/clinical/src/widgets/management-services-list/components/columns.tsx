import { type ColumnDef } from '@tanstack/react-table'
import type { Service } from '@psychplus/management-services'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { RowActionDropdown } from './table-action-cell'
import { TableCellSelector } from './table-selector-cell'

const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.id} />,
  },
  {
    accessorKey: 'locationType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Location Type"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.locationType} />,
  },
  {
    accessorKey: 'locationName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Location Name"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.locationName} />,
  },
  {
    accessorKey: 'service',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Service"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.service} />,
  },
  {
    accessorKey: 'pos',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="POS"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.pos.toString()} />,
  },
  {
    accessorKey: 'address.address1',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Primary Address 1"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.address.address1} />,
  },
  {
    accessorKey: 'address.address2',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address 2"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.address.address2} />,
  },
  {
    accessorKey: 'address.city',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="City"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.address.city} />,
  },
  {
    accessorKey: 'address.state',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="State"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.address.state} />,
  },
  {
    accessorKey: 'address.zip',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Zip"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellText text={row.original.address.zip.toString()} />
    ),
  },
  {
    accessorKey: 'psychplusPolicy',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Psychplus Policy"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.psychplusPolicy} />,
  },
  {
    id: 'reminders',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Reminders"
        className="font-medium text-[#000]"
      />
    ),
    columns: [
      {
        accessorKey: 'reminders.provNotes',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Prov. Notes"
            className="font-medium text-[#000]"
          />
        ),
        cell: ({ row }) => (
          <TableCellText text={row.original.reminders.provNotes} />
        ),
      },
      {
        accessorKey: 'reminders.ptVisit',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Pt, Visit"
            className="font-medium text-[#000]"
          />
        ),
        cell: ({ row }) => (
          <TableCellText text={row.original.reminders.ptVisit} />
        ),
      },
    ],
  },
  {
    accessorKey: 'ehrCode',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="EHR Code"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.ehrCode.toString()} />,
  },
  {
    accessorKey: 'cosigner',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cosigner"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.cosigner} />,
  },
  {
    accessorKey: 'cosignerType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cosigner Type"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.cosignerType} />,
  },
  {
    accessorKey: 'primaryProvider',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Primary Provider"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.primaryProvider} />,
  },
  {
    accessorKey: 'visitType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Visit Type"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.visitType} />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellSelector row={row} name="status" />,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="font-medium text-[#000]"
      />
    ),
    cell: ({ row: { original } }) => <RowActionDropdown data={original} />,
  },
]

export { columns }
