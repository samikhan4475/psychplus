'use client'

import { useEffect } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { formatDate, getSortDir } from '@/utils'
import { ActionsCell } from './cells/actions-cell'
import { useStore } from './store'
import { ClaimSubmissionHistory } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ClaimSubmissionHistory>[] => [
  {
    id: 'batchId',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Batch #"
      />
    ),
    cell: ({ row }) => <LongTextCell>{`${row.original.id}`}</LongTextCell>,
  },
  {
    id: 'batchName',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Batch Name"
        column={column}
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.batchName}</TextCell>,
  },
  {
    id: 'isaControlNumber',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="ICN #"
      />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.isaControlNumber ?? '-'}</TextCell>
    ),
  },
  {
    id: 'claimCount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Total # of Claims"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.claimCount}</TextCell>,
  },
  {
    id: 'createdOn',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Batch Date"
      />
    ),
    cell: ({ row }) => (
      <DateCell>
        {formatDate(row.original.metadata.createdOn, 'MM/dd/yyyy')}
      </DateCell>
    ),
  },
  {
    id: 'batchType',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Batch Type"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.batchType}</TextCell>,
  },
  {
    id: 'createdByFullName',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Created By"
      />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'actions',
    header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const SubmissionHistoryTable = () => {
  const { data, loading, sort, sortData, search } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
    search: state.search,
  }))
  useEffect(() => {
    search()
  }, [])
  if (loading) {
    return (
      <Flex className='flex-1' align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  if (!data) {
    return (
      <Flex height="100%" align="center" justify="center">
        <Text
          weight="light"
          className="flex items-center gap-2 text-[14px] text-gray-10"
        >
          <MagnifyingGlassIcon width={18} height={18} />
          Use the form to search for submission history
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea className='h-full shadow-1'>
      <DataTable
        tableClass="[&_.rt-ScrollAreaRoot]:pb-2"
        data={data.submissionHistory}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { SubmissionHistoryTable }
