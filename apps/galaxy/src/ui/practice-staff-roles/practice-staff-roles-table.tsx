'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Role } from '@/types'
import { ActionsCell } from './cells'
import { useStore } from './store'

const columns: ColumnDef<Role>[] = [
  {
    id: 'shortName',
    accessorKey: 'shortName',
    header: ({ column }) => (
      <ColumnHeader label="Role" sortable column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.shortName}</TextCell>,
  },
  {
    id: 'actorCategory',
    accessorKey: 'actorCategory',
    header: ({ column }) => (
      <ColumnHeader
        label="Staff Type"
        sortable
        column={column}
        clientSideSort
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.actorCategory}</TextCell>,
  },
  {
    id: 'displayName',
    accessorKey: 'displayName',
    header: ({ column }) => (
      <ColumnHeader
        label="Display Name"
        sortable
        column={column}
        clientSideSort
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ActionsCell,
  },
]

const OrganizationPracticesListTable = () => {
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
  }))

  if (loading) {
    return (
      <Box className="flex h-screen items-center justify-center">
        <LoadingPlaceholder />
      </Box>
    )
  }

  return (
    <Box className="bg-white rounded my-1 p-1">
      <ScrollArea className="rounded p-1">
        <DataTable
          data={data || []}
          columns={columns}
          disablePagination
          tableClass="bg-white [&_.rt-ScrollAreaScrollbar]:!hidden"
        />
      </ScrollArea>
    </Box>
  )
}

export { OrganizationPracticesListTable }
