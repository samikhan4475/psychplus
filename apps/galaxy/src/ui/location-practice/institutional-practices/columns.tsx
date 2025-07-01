import { Box } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { LocationPractice } from '@/types'
import { StateCell, StatusCell } from './cells'
import { TableRowRadioCell } from './table-row-radiobtn-cell'

const columns: ColumnDef<LocationPractice>[] = [
  {
    id: 'select',
    size: 10,
    header: () => <ColumnHeader label="Primary" />,
    cell: ({ row }) => (
      <Box className="pl-[2px]">
        <TableRowRadioCell row={row} />
      </Box>
    ),
  },
  {
    id: 'practice.displayName',
    accessorKey: 'practice.displayName',
    header: ({ column }) => (
      <ColumnHeader label="Name" sortable column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.practice.displayName}</TextCell>
    ),
  },
  {
    id: 'practice.npi',
    accessorKey: 'practice.npi',
    header: ({ column }) => (
      <ColumnHeader label="NPI" sortable column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell className="max-w-36">{original?.practice.npi}</LongTextCell>
    ),
  },
  {
    id: 'practice.tin',
    accessorKey: 'practice.tin',
    header: ({ column }) => (
      <ColumnHeader label="TIN" column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {original?.practice.npi ? original?.practice.tin : 'N/A'}
      </LongTextCell>
    ),
  },
  {
    id: 'practice.organizationShortName',
    accessorKey: 'practice.organizationShortName',
    header: ({ column }) => (
      <ColumnHeader label="Organization" column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {original?.practice.organizationShortName ?? 'N/A'}
      </LongTextCell>
    ),
  },

  {
    id: 'practice?.practiceAddress?.street1',
    accessorKey: 'practice?.practiceAddress?.street1',
    header: ({ column }) => (
      <ColumnHeader label="Primary Address 1" column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {original?.practice?.practiceAddress?.street1 ?? 'N/A'}
      </LongTextCell>
    ),
  },
  {
    id: 'practice?.practiceAddress?.street2',
    accessorKey: 'practice?.practiceAddress?.street2',
    header: ({ column }) => (
      <ColumnHeader label="Address 2" column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {original?.practice?.practiceAddress?.street2 ?? 'N/A'}
      </LongTextCell>
    ),
  },
  {
    id: 'practice?.practiceAddress?.city',
    accessorKey: 'practice?.practiceAddress?.city',
    header: ({ column }) => (
      <ColumnHeader label="City" column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>{original?.practice?.practiceAddress?.city}</LongTextCell>
    ),
  },
  {
    id: 'practice?.practiceAddress?.state',
    accessorKey: 'practice?.practiceAddress?.state',
    header: ({ column }) => (
      <ColumnHeader label="State" column={column} clientSideSort />
    ),
    cell: StateCell,
  },
  {
    id: 'practice?.practiceAddress?.zipLast4',
    accessorKey: 'practice?.practiceAddress?.zipLast4',
    header: ({ column }) => (
      <ColumnHeader label="ZIP" column={column} clientSideSort />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.practice?.practiceAddress?.zipLast4}</TextCell>
    ),
  },

  {
    id: 'status',
    accessorKey: 'recordStatus',
    header: ({ column }) => (
      <ColumnHeader label="Status" column={column} clientSideSort />
    ),
    cell: StatusCell,
  },
]

export { columns }
