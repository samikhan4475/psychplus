'use client'

import { useEffect, useMemo } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Sort } from '@/types'
import { formatUTCDate, getSortDir } from '@/utils'
import { GetIdProofingResponse } from '../types'
import RequestByStaffCell from './cells/request-by-staff-cell'
import { useStore } from './store'

interface EPCSTableProps {
  userId: string | null
}

const columns = (
  proofingStatus: Record<string, string>,
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<GetIdProofingResponse>[] => {
  return [
    {
      id: 'startedAt',
      accessorFn: (row) => row.startedAt,
      size: 200,
      header: ({ column }) => (
        <ColumnHeader
          label="Requested Date"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.startedAt && formatUTCDate(row.original.startedAt)}
        </TextCell>
      ),
    },
    {
      id: 'requestedBy',
      accessorKey: 'requestedBy',
      header: ({ column }) => (
        <ColumnHeader
          label="Requested By"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => <RequestByStaffCell row={row} />,
    },
    {
      id: 'proofingStatus',
      accessorKey: 'proofingStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {proofingStatus[row.original.proofingStatus] || 'Unknown'}
        </TextCell>
      ),
    },
    {
      id: 'validFrom',
      accessorKey: 'validFrom',
      header: ({ column }) => (
        <ColumnHeader
          label="Approval Date"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.validFrom && formatUTCDate(row.original.validFrom)}
        </TextCell>
      ),
    },
    {
      id: 'validUntil',
      accessorKey: 'validUntil',
      header: ({ column }) => (
        <ColumnHeader
          label="Expiry Date"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          className="!text-black p-1 !font-medium"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.validUntil && formatUTCDate(row.original.validUntil)}
        </TextCell>
      ),
    },
  ]
}

const EPCSTable = ({ userId }: EPCSTableProps) => {
  const proofingStatusArray = useCodesetCodes(CODESETS.ProofingStatus)

  const proofingStatus = useMemo(
    () =>
      proofingStatusArray.reduce<Record<string, string>>((acc, code) => {
        acc[code.value] = code.display
        return acc
      }, {}),
    [proofingStatusArray],
  )

  const { data, loading, sort, epcsIframeLoaded, sortData, fetch } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      sort: state.sort,
      sortData: state.sortData,
      fetch: state.fetch,
      epcsIframeLoaded: state.epcsIframeLoaded,
    }),
  )

  useEffect(() => {
    if (userId && !epcsIframeLoaded) {
      fetch({ userId: String(userId) })
    }
  }, [userId, fetch, epcsIframeLoaded])

  if (loading) {
    return <LoadingPlaceholder className="bg-white min-h-[46vh]" />
  }

  return (
    <ScrollArea className="bg-white h-full min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      <DataTable
        data={data?.userProofings ?? []}
        columns={columns(proofingStatus, sort, sortData)}
        tdClass="!p-0 first:bg-white"
        isRowSpan
        disablePagination
        sticky
        tableRowClass="border-b border-red-200"
      />
    </ScrollArea>
  )
}

export { EPCSTable }
