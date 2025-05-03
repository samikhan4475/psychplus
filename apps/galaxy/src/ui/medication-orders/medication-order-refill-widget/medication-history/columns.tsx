import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { formatDateTime } from '@/utils'
import { MedicationHistoryResponse } from '../types'

const columns: ColumnDef<MedicationHistoryResponse>[] = [
  {
    id: 'metadata.updatedOn',
    accessorKey: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[120px]">
        {formatDateTime(
          row.original.metadata.updatedOn ?? row.original.metadata.createdOn,
        )}
      </TextCell>
    ),
  },
  {
    id: 'metadata.updatedByFullName',
    accessorKey: 'metadata.updatedByFullName',
    header: ({ column }) => (
      <ColumnHeader label="Name" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[120px]">
        {row.original.metadata.updatedByFullName ??
          row.original.metadata.createdByFullName ??
          ''}
      </TextCell>
    ),
  },
  {
    id: 'sectionName',
    accessorKey: 'sectionName',
    header: ({ column }) => (
      <ColumnHeader label="Section" column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.sectionName}</TextCell>,
  },

  {
    id: 'fieldName',
    accessorKey: 'fieldName',
    header: ({ column }) => (
      <ColumnHeader label="Field" column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.fieldName}</TextCell>,
  },
  {
    id: 'oldValue',
    accessorKey: 'oldValue',
    header: ({ column }) => (
      <ColumnHeader label="Previous Value" column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.oldValue}</TextCell>,
  },
  {
    id: 'newValue',
    accessorKey: 'newValue',
    header: ({ column }) => (
      <ColumnHeader label="Current Value" column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.newValue}</TextCell>,
  },
]

export { columns }
