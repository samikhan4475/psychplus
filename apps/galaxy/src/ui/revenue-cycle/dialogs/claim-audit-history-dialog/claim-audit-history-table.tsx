'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { getClaimAuditHistoryListAction } from '../../actions'
import { ClaimAuditHistory, ClaimAuditHistoryPayload } from '../../types'
import { ClaimAuditHistoryFilterForm } from './claim-audit-history-filter-form'

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

const ClaimAuditHistoryTable = ({ claimId }: { claimId: string }) => {
  const [data, setData] = useState<ClaimAuditHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClaimAuditHistory()
  }, [])

  const fetchClaimAuditHistory = async (payload?: ClaimAuditHistoryPayload) => {
    setLoading(true)
    const reqPayload = {
      ...payload,
      claimId,
    }
    const response = await getClaimAuditHistoryListAction(reqPayload)
    setLoading(false)
    if (response.state === 'error') {
      return setData([])
    }
    setData(response.data)
  }

  return (
    <>
      <ClaimAuditHistoryFilterForm onFilterSubmit={fetchClaimAuditHistory} />
      {loading ? (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <ScrollArea>
          <DataTable
            data={data}
            columns={columns}
            disablePagination
            sticky
            tableClass="h-[400px]"
          />
        </ScrollArea>
      )}
    </>
  )
}

export { ClaimAuditHistoryTable }
