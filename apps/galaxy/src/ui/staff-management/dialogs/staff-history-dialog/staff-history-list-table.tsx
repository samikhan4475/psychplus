'use client'

import { useEffect } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatUTCDate } from '@/utils'
import { Staff } from '../../types'
import { StaffRecordInfo } from './staff-record-info'
import { useStore } from './store'

const columns: ColumnDef<Staff>[] = [
  {
    id: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {formatUTCDate(row.original.metadata.updatedOn as string)}
      </TextCell>
    ),
  },
  {
    id: 'metadata.updatedByFullName',
    header: ({ column }) => (
      <ColumnHeader label="User Name" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata.updatedByFullName}</TextCell>
    ),
  },
]

const StaffListTable = ({ staffId }: { staffId: string }) => {
  const { setSelectedRecord, search, data, loading } = useStore()

  useEffect(() => {
    search(staffId)
  }, [staffId])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  if (!data) {
    return (
      <Flex height="100%" align="center" justify="center">
        No records found
      </Flex>
    )
  }

  return (
    <Flex gap="4">
      <Box>
        <ScrollArea className="bg-white max-w-[300px]">
          <DataTable
            tableRowClass="h-[28px]"
            data={data ?? []}
            onRowClick={(row) => setSelectedRecord(row.original)}
            columns={columns}
            disablePagination
            sticky
          />
        </ScrollArea>
      </Box>
      <Box>
        <StaffRecordInfo />
      </Box>
    </Flex>
  )
}

export { StaffListTable }
