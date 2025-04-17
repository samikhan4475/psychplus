import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { RowActionSelected } from './row-action-selected'
import { Permission } from './types'

const columns = (sectionCode: string): ColumnDef<Permission>[] => {
  return [
    {
      id: 'displayName',
      header: () => <ColumnHeader label="Description" />,
      cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
    },
    {
      id: 'permission',

      header: () => <ColumnHeader label="Permission" />,
      cell: ({ row }) => (
        <RowActionSelected record={row.original} sectionCode={sectionCode} />
      ),
      size: 5,
    },
  ]
}

export { columns }
