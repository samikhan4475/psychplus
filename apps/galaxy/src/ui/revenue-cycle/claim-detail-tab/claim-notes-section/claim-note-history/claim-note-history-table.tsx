'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { ClaimAuditHistory } from '@/ui/revenue-cycle/types'
import { formatDateTime } from '@/utils'
import { getClaimNoteHistoryAction } from '../../actions'

const columns: ColumnDef<ClaimAuditHistory>[] = [
  {
    id: 'metadata.updatedOn',
    accessorKey: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[120px]">
        {formatDateTime(row.original.metadata.updatedOn)}
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
        {row.original.metadata.updatedByFullName}
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

const ClaimNoteHistoryTable = ({ claimNoteId }: { claimNoteId?: string }) => {
  const [data, setData] = useState<ClaimAuditHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClaimAuditHistory()
  }, [claimNoteId])

  const fetchClaimAuditHistory = async () => {
    if (!claimNoteId) return
    setLoading(true)
    const reqPayload = {
      claimNoteId: claimNoteId,
      isIncludeCreateHistory: false,
    }
    const response = await getClaimNoteHistoryAction(reqPayload)
    setLoading(false)
    if (response.state === 'error') {
      return setData([])
    }
    setData(response.data)
  }

  return (
    <Box>
      {loading ? (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <ScrollArea>
          <DataTable data={data} columns={columns} disablePagination sticky />
        </ScrollArea>
      )}
    </Box>
  )
}

export { ClaimNoteHistoryTable }
