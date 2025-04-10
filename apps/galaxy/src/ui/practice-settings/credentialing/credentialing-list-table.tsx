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
import { concatDateTimeAndFormat } from '@/utils'
import { CredentialingHistoryDialog } from '../dialogs'
import { CredentialingManager } from '../types'
import { ActionsCell } from './cells'
import { useStore } from './store'

const columns: ColumnDef<CredentialingManager>[] = [
  {
    id: 'manager',
    accessorKey: 'managerName.firstName',
    header: ({ column }) => (
      <ColumnHeader label="Manager" sortable column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.managerName &&
          `${row.original.managerName?.firstName} ${row.original.managerName?.lastName}`}
      </TextCell>
    ),
  },
  {
    id: 'addedOn',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader label="Added on" clientSideSort sortable column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {concatDateTimeAndFormat(row.original.metadata.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader label="Status" clientSideSort sortable column={column} />
    ),
    cell: ({ row }) => <CredentialingHistoryDialog row={row} />,
  },
  {
    id: 'alert',
    header: () => <ColumnHeader label="Alert" />,
    cell: ActionsCell,
    size: 40,
  },
]

// Will be removed in next integration ticket

const CredentialingListTable = () => {
  const { id } = useParams<{ id: string; type: string }>()
  const { loading, search, data } = useStore((state) => ({
    loading: state.loading,
    search: state.search,
    data: state.data,
  }))

  useEffect(() => {
    search(id)
  }, [id])

  if (loading) {
    return (
      <Box className="flex h-[300px] items-center justify-center">
        <LoadingPlaceholder />
      </Box>
    )
  }

  return (
    <Box className="bg-white rounded">
      <ScrollArea className="rounded-lg p-1">
        <DataTable
          data={data}
          columns={columns}
          disablePagination
          sticky
          tableClass="bg-white w-[720px] [&_.rt-ScrollAreaRoot]:!overflow-visible rounded-lg"
        />
      </ScrollArea>
    </Box>
  )
}

export { CredentialingListTable }
