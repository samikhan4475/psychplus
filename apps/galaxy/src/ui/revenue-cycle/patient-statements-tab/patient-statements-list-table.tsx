'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { PatientStatement } from '../types'
import { ActionsCell } from './actions-cell'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PatientStatement>[] => {
  return [
    {
      id: 'patientName',
      header: ({ column }) => (
        <ColumnHeader
          label="Patient Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{`${row.original.patientFirstName} ${row.original.patientLastName}`}</TextCell>
      ),
    },
    {
      id: 'accountNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Account #"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.accountNumber}</TextCell>,
    },
    {
      id: 'totalAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Total Amount"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>${row.original.totalAmount}</TextCell>,
    },

    {
      id: 'paidAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Patient Paid"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>${row.original.paidAmount}</TextCell>,
    },

    {
      id: 'patientBalanceDue',
      header: ({ column }) => (
        <ColumnHeader
          label="Patient Balance Due"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>${row.original.patientBalanceDue}</TextCell>,
    },

    {
      id: 'insurancePaid',
      header: ({ column }) => (
        <ColumnHeader
          label="Insurance Adjustment"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>${row.original.insurancePaid}</TextCell>,
    },

    {
      id: 'totalAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Total Balance"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>${row.original.totalAmount}</TextCell>,
    },

    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

const PatientStatementsListTable = () => {
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
        data={data?.patientStatements ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientStatementsListTable }
