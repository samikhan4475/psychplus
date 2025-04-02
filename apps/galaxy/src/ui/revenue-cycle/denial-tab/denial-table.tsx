'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { formatDate, getSortDir } from '@/utils'
import { DenialServiceLine } from '../types'
import { ActionsCell } from './actions-cell'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<DenialServiceLine>[] => {
  return [
    {
      id: 'insuranceName',
      header: ({ column }) => (
        <ColumnHeader
          label="Insurance Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.insuranceName ?? ''}</TextCell>
      ),
    },
    {
      id: 'checkNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Check Number"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.checkNumber ?? ''}</TextCell>,
    },
    {
      id: 'checkDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Check Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.checkDate && (
          <DateCell>
            {formatDate(`${row.original.checkDate}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
    },
    {
      id: 'claimNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Claim Number"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.claimNumber}</TextCell>,
    },
    {
      id: 'dateOfServiceFrom',
      header: ({ column }) => (
        <ColumnHeader
          label="Date of Service From"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.dateOfServiceFrom && (
          <DateCell>
            {formatDate(`${row.original.dateOfServiceFrom}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
    },
    {
      id: 'dateOfServiceTo',
      header: ({ column }) => (
        <ColumnHeader
          label="Date of Service To"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.dateOfServiceTo && (
          <DateCell>
            {formatDate(`${row.original.dateOfServiceTo}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
    },
    {
      id: 'processedAsCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Processed as"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.processedAsCode}</TextCell>,
    },
    {
      id: 'deniedReason',
      header: ({ column }) => (
        <ColumnHeader
          label="Denial Reason"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.deniedReason}</TextCell>,
    },
    {
      id: 'icn',
      header: ({ column }) => (
        <ColumnHeader
          label="ICN #"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.icn}</TextCell>,
    },
    {
      id: 'isResolved',
      header: ({ column }) => (
        <ColumnHeader
          label="Resolve Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.isResolved ? 'Resolved' : 'Pending'}</TextCell>,
    },
    {
      id: 'resolvedByName',
      header: ({ column }) => (
        <ColumnHeader
          label="Resolved by"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{`${row.original.resolvedByName?.firstName ?? ''} ${
          row.original.resolvedByName?.lastName ?? ''
        }`}</TextCell>
      ),
    },
    {
      id: 'resolvedDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Resolved Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.resolvedDate && (
          <DateCell>
            {formatDate(`${row.original.resolvedDate}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
    },
    {
      id: 'action',
      header: ({ column }) => (
        <ColumnHeader
          label="Action"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ActionsCell,
    },
  ]
}

const DenialListTable = () => {
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({})
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.denialList ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { DenialListTable }
