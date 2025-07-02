'use client'

import { useEffect } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { useStore } from '../store'
import { Practice } from '../types'
import { RowActionDeletePractice } from './row-action-delete'

const columns: ColumnDef<Practice>[] = [
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
    id: 'practiceAddress.postalPlus4Code',
    header: ({ column }) => (
      <ColumnHeader label="Postal+4" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.practiceAddress?.postalPlus4Code ?? ''}</TextCell>
    ),
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="" />,
    cell: ({ row }) => <RowActionDeletePractice row={row} />,
  },
]

const PracticesListTable = () => {
  const form = useFormContext()
  const organizationId = form.watch('organizationId')
  const {
    searchDialogPractices,
    dialogTableData,
    dialogTableLoading,
    currentUserId,
  } = useStore((state) => ({
    dialogTableData: state.dialogTableData,
    dialogTableLoading: state.dialogTableLoading,
    searchDialogPractices: state.searchDialogPractices,
    currentUserId: state.currentUserId,
  }))

  useEffect(() => {
    if (!organizationId || dialogTableLoading) return

    searchDialogPractices({
      organizationId: organizationId ?? '',
      staffuserId: currentUserId,
    })
  }, [organizationId])

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
          columns={columns}
          tableClass="bg-white [&_.rt-ScrollAreaScrollbar]:!hidden"
        />
      </ScrollArea>
    </Box>
  )
}

export { PracticesListTable }
