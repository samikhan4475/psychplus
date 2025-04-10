'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { useStore } from '../store'
import { Practice } from '../types'
import { RowActionDeletePractice } from './row-action-delete'

const columns = (userId: string): ColumnDef<Practice>[] => [
  {
    id: 'displayName',
    header: ({ column }) => (
      <ColumnHeader label="Practice Name" column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
  },
  {
    id: 'practiceAddress.street1',
    header: ({ column }) => (
      <ColumnHeader label="Address 1" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.street1}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.street2',
    header: ({ column }) => (
      <ColumnHeader label="Address 2" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.street2}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.city',
    header: ({ column }) => (
      <ColumnHeader label="City" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.city ?? ''}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.state',
    header: ({ column }) => (
      <ColumnHeader label="State" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.state ?? ''}</TextCell>
    ),
  },
  {
    id: 'practiceAddress.postalCode',
    header: ({ column }) => (
      <ColumnHeader label="ZIP" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.postalCode ?? ''}</TextCell>
    ),
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="" />,
    cell: ({ row }) => <RowActionDeletePractice row={row} userId={userId} />,
  },
]

interface PracticesListTableProps {
  data: Practice
  userId: string
}
const PracticesListTable = ({ data, userId }: PracticesListTableProps) => {
  const { searchDialogPractices, dialogTableData, dialogTableLoading } =
    useStore((state) => ({
      dialogTableData: state.dialogTableData,
      dialogTableLoading: state.dialogTableLoading,
      searchDialogPractices: state.searchDialogPractices,
    }))

  useEffect(() => {
    searchDialogPractices({
      organizationId: data?.organizationId ?? '',
      staffuserId: parseInt(userId),
    })
  }, [data?.organizationId])

  if (dialogTableLoading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className="bg-white rounded my-1 p-1">
      <ScrollArea className="rounded p-1">
        <DataTable
          data={dialogTableData || []}
          columns={columns(userId)}
          tableClass="bg-white [&_.rt-ScrollAreaScrollbar]:!hidden"
        />
      </ScrollArea>
    </Box>
  )
}

export { PracticesListTable }
