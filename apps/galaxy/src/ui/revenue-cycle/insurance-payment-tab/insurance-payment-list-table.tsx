'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
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
import { getSortDir } from '@/utils'
import { formatDate } from '@/utils/date'
import { InsurancePayment } from '../types'
import { addSpaceToCamelCase } from '../utils'
import { ActionsCell } from './actions-cell'
import { CheckNumberCell } from './check-number-cell'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<InsurancePayment>[] => {
  return [
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
      cell: ({ row }) => (
        <CheckNumberCell row={row}>{row.original.checkNumber}</CheckNumberCell>
      ),
    },
    {
      id: 'paymentType',
      header: ({ column }) => (
        <ColumnHeader
          label="Payment Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.paymentType.toUpperCase()}</TextCell>
      ),
    },
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
      cell: ({ row }) => <LongTextCell className='w-[150px]'>{row.original.insuranceName}</LongTextCell>,
    },
    {
      id: 'amount',
      header: ({ column }) => (
        <ColumnHeader
          label="Amount"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell hasPayment>{row.original.amount}</TextCell>,
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
      cell: ({ row }) => (
        <DateCell>
          {row.original.checkDate ? formatDate(`${row.original.checkDate}`, 'MM/dd/yyyy') : ''}
        </DateCell>
      ),
    },
    {
      id: 'receivedDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Received Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {row.original.receivedDate ?  formatDate(`${row.original.receivedDate}`, 'MM/dd/yyyy') : ''}
        </DateCell>
      ),
    },
    {
      id: 'claimCount', // noindex is here because right now we are not mapping any value against this column
      header: ({ column }) => (
        <ColumnHeader
          label="Total Claim"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.claimCount}</TextCell>,
    },
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <LongTextCell>{addSpaceToCamelCase(row.original.status)}</LongTextCell>
      ),
    },
    {
      id: 'postedAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Posted Amount"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.postedAmount}</TextCell>
      ),
    },

    {
      id: 'unPostedAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Unposted Amount"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.unPostedAmount}</TextCell>
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]
}

const InsurancePaymentListTable = () => {
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
        data={data?.insurancePayments ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { InsurancePaymentListTable }
