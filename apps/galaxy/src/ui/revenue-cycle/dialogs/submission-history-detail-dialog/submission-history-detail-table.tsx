import React, { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { formatDate, getNewSortDir, getSortDir } from '@/utils'
import { getSubmissionHistoryDetail } from '../../actions/get-submission-history-detail'
import { ClaimSubmissionHistoryDetail } from '../../submission-tab/submission-history-tab/types'
import { DueAmountCell } from './due-amount-cell'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ClaimSubmissionHistoryDetail>[] => [
  {
    id: 'claimNumber',
    accessorKey: 'claimNumber',
    size: 10,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Claim Number"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.claimNumber}</TextCell>,
  },
  {
    id: 'patientName',
    accessorKey: 'patientName',
    size: 10,
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Patient Name"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientName}</TextCell>,
  },
  {
    id: 'dateOfServiceFrom',
    accessorKey: 'dateOfServiceFrom',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="DOS"
      />
    ),
    cell: ({ row }) => (
      <DateTimeCell>
        {formatDate(row.original.dateOfServiceFrom, 'MM-dd-yyyy') || '-'}
      </DateTimeCell>
    ),
  },
  {
    id: 'createdOn',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Submitted Date"
      />
    ),
    cell: ({ row }) => (
      <DateTimeCell>
        {formatDate(row.original.metadata.createdOn, 'MM-dd-yyyy')}
      </DateTimeCell>
    ),
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Due Amount"
      />
    ),
    cell: ({ row }) => (
      <DueAmountCell>
        {`$${row.original.amount !== undefined ? row.original.amount : 0}`}
      </DueAmountCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Status"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.status || '-'}</TextCell>,
  },
]

const SubmissionHistoryDetailTable = ({ batchId }: { batchId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [historyData, setHistoryData] = useState<
    ClaimSubmissionHistoryDetail[]
  >([])
  const [sort, setSort] = useState<Sort>()

  const sortData = (column: string) =>
    setSort({ column, direction: getNewSortDir(column, sort) })

  const fetchHistoryDetail = (batchId: string, sort?: Sort) => {
    setIsLoading(true)
    getSubmissionHistoryDetail(batchId, sort).then((result) => {
      if (result.state === 'error') {
        toast.error(result.error)
      }
      if (result.state === 'success') {
        setHistoryData(result.data)
      }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if (batchId) fetchHistoryDetail(batchId, sort)
  }, [batchId, sort])

  if (isLoading) {
    return <LoadingPlaceholder className="bg-white min-h-[23vh]" />
  }

  return (
    <ScrollArea>
      <DataTable
        data={historyData}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { SubmissionHistoryDetailTable }
