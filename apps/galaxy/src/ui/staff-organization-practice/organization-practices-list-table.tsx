'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { ActionsCell } from './cells'
import { useStore } from './store'
import { Practice } from './types'

const columns = (userId: string): ColumnDef<Practice>[] => [
  {
    id: 'organizationDisplayName',
    accessorKey: 'organizationDisplayName',
    header: ({ column }) => (
      <ColumnHeader label="Organization Name" clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.organizationDisplayName}</TextCell>
    ),
  },
  {
    id: 'displayName',
    accessorKey: 'displayName',
    header: ({ column }) => (
      <ColumnHeader label="Practice Name" clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
  },
  {
    id: 'practiceAddress.street1',
    accessorKey: 'practiceAddress.street1',
    header: ({ column }) => (
      <ColumnHeader label="Address 1" clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.street1}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.street2',
    accessorKey: 'practiceAddress.street2',
    header: ({ column }) => (
      <ColumnHeader label="Address 2" clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.street2}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.city',
    accessorKey: 'practiceAddress.city',
    header: ({ column }) => (
      <ColumnHeader column={column} label="City" clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.city ?? ''}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.state',
    accessorKey: 'practiceAddress.state',
    header: ({ column }) => (
      <ColumnHeader column={column} label="State" clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.state ?? ''}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.postalCode',
    accessorKey: 'practiceAddress.postalCode',
    header: ({ column }) => (
      <ColumnHeader column={column} label="ZIP" clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.postalCode ?? ''}</TextCell>
    ),
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionsCell row={row} userId={userId} />,
  },
]

const OrganizationPracticesListTable = ({ userId }: { userId: string }) => {
  const { search, data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))

  useEffect(() => {
    search({
      staffuserId: parseInt(userId),
    })
  }, [userId])

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
          columns={columns(userId)}
          disablePagination
          tableClass="bg-white [&_.rt-ScrollAreaScrollbar]:!hidden"
        />
      </ScrollArea>
    </Box>
  )
}

export { OrganizationPracticesListTable }
